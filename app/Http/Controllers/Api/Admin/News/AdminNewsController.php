<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\News;

use App\Enums\Common\Locale;
use App\Exceptions\Entity\CustomDBException;
use App\Exceptions\Entity\CustomTransactionException;
use App\Exceptions\Entity\CustomValidationException;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\News\ClearUnUsedImagesRequest;
use App\Http\Requests\News\CreateRequest;
use App\Http\Requests\News\DeleteNewsRequest;
use App\Http\Requests\News\EditRequest;
use App\Http\Requests\News\UploadImageRequest;
use App\Models\News\News;
use App\Models\News\NewsDuplicate;
use App\Repositories\News\NewsRepository;
use DB;
use File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Throwable;

class AdminNewsController extends BaseController
{
    // тут все файлы по новостям хранятся
    private const PATH_TO_NEWS_UPLOADS = 'uploads/news/';

    /**
     * Все новости.
     * @param Request $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function index(Request $request, NewsRepository $newsRep): JsonResponse
    {
        $res = $newsRep->findAdmin(getPage($request));

        return $this->successResponse('', preparePaginationResponse('news', $res));
    }

    /**
     * Создает новость.
     * @param CreateRequest $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     * @throws Throwable
     */
    public function create(CreateRequest $request, NewsRepository $newsRep): JsonResponse
    {
        try {
            $user = $this->user();
            /** @var News $newsInfo */
            $newsInfo = DB::transaction(function () use ($request, $user, $newsRep) {
                $data = $request->validated();

                $title = trim($data['title']);
                $newsInfo = News::create([
                    'user_id' => $user->id,
                    self::LOCALE_PARAM => Locale::from($data[self::LOCALE_PARAM]),
                    'title' => $title,
                    'text' => trim($data['text']),
                    'short_text' => trim($data['short_text']),
                    'slug' => Str::slug($title),
                    'image' => '',
                ]);

                $duplicates = $this->prepareDuplicates($newsInfo, $newsRep, $data['duplicates'] ?? []);
                if (!is_array($duplicates)) {
                    throw new CustomValidationException($duplicates);
                }

                $this->createRelationDuplicates($newsInfo->id, $duplicates);

                $mainImageUrl = $this->saveMainImage($newsInfo->id);
                if (is_null($mainImageUrl) || is_a($mainImageUrl, JsonResponse::class)) {
                    throw new CustomTransactionException(
                        is_null($mainImageUrl)
                            ? __('news.admin.create.no_image')
                            : $mainImageUrl->getData(true)['msg']
                    );
                }

                $newsInfo->image = $mainImageUrl;

                $replacedImages = $this->checkAndDeleteUnUsedImages($newsInfo, 0);
                if (!$newsInfo->save()) {
                    throw new CustomDBException(failMsg());
                }

                $this->moveReplaceImages($replacedImages, $newsInfo->id);

                return $newsInfo;
            });
        } catch (CustomValidationException|CustomTransactionException|CustomDBException $e) {
            if ($e instanceof CustomValidationException) {
                return $this->validationResponse($e->getMessage());
            }

            return $this->internalResponse($e->getMessage());
        }

        return $this->successResponse(__('news.admin.create.success'), [
            'id' => $newsInfo->id,
        ]);
    }

    /**
     * Деталка новости.
     * @param int $id
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function info(int $id, NewsRepository $newsRep): JsonResponse
    {
        $key = 'id';
        if (!validateIntForDB($key, $id)) {
            return $this->validationResponse(__('validation.custom.integer', ['attribute' => $key]));
        }

        /** @var News|null $newsInfo */
        $newsInfo = $newsRep->findInfoAdmin($id);
        if (!$newsInfo) {
            return $this->notFoundResponse(__('news.not_found'));
        }

        return $this->successResponse('', [
            'newsInfo' => $newsInfo,
            'duplicates' => $newsRep->findShortDuplicates($newsInfo),
            'images' => getFilesURL(self::PATH_TO_NEWS_UPLOADS.$id),
        ]);
    }

    /**
     * Редактирование новости.
     * @param EditRequest $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     * @throws Throwable
     */
    public function edit(EditRequest $request, NewsRepository $newsRep): JsonResponse
    {
        $data = $request->validated();

        /** @var News|null $newsInfo */
        $newsInfo = $newsRep->findInfoAdmin((int)$data['id']);
        if (!$newsInfo) {
            return $this->notFoundResponse(__('news.not_found'));
        }

        $newsInfo->short_text = trim($data['short_text'] ?? $newsInfo->short_text);
        $newsInfo->text = trim($data['text'] ?? $newsInfo->text);
        $newsInfo->title = trim($data['title'] ?? $newsInfo->title);
        if (isset($data['title'])) {
            $newsInfo->slug = Str::slug($newsInfo->title);
        }

        $duplicates = $this->prepareDuplicates($newsInfo, $newsRep, $data['duplicates'] ?? []);
        if (!is_array($duplicates)) {
            return $this->badRequestResponse($duplicates);
        }

        $mainImageUrl = $this->saveMainImage($newsInfo->id);
        if (is_a($mainImageUrl, JsonResponse::class)) {
            return $mainImageUrl;
        } elseif (!is_null($mainImageUrl)) {
            $newsInfo->image = $mainImageUrl;
        }

        $this->checkAndDeleteUnUsedImages($newsInfo, $newsInfo->id);

        $oldDuplicates = $newsRep->findShortDuplicates($newsInfo);
        $errorResponse = DB::transaction(function () use ($newsInfo, $oldDuplicates, $duplicates) {
            if (!$newsInfo->save()) {
                return $this->internalResponse(failMsg());
            }

            NewsDuplicate::where('news_id', $newsInfo->id)->delete();
            /** @var News $duplicate */
            foreach ($oldDuplicates as $duplicate) {
                NewsDuplicate::where('news_id', $duplicate->id)
                    ->where('duplicate_news_id', $newsInfo->id)
                    ->delete();
            }

            $this->createRelationDuplicates($newsInfo->id, $duplicates);

            return null;
        });

        return is_null($errorResponse)
            ? $this->successResponse(__('news.admin.edit.success'))
            : $errorResponse;
    }

    /**
     * При переносе картинок в тестовый редактор основного текста сюда шлются картинки для загрузки.
     * @param UploadImageRequest $request
     * @param NewsRepository $rep
     * @return JsonResponse
     */
    public function uploadImage(UploadImageRequest $request, NewsRepository $rep): JsonResponse
    {
        $id = (int)$request->get('id');
        $news = $rep->findInfo($id);
        if ($id && !$news) {
            return $this->notFoundResponse(__('news.not_found'));
        }

        /** @var UploadedFile|null $file */
        $file = $request->file('image');
        if (!$file) {
            return $this->badRequestResponse(__('news.admin.edit.no_image'));
        }

        try {
            $fileName = sprintf('%s.%s', Str::uuid()->toString(), $file->getClientOriginalExtension());
            $path = self::PATH_TO_NEWS_UPLOADS.$id;
            $file->move(public_path($path), $fileName);

            return $this->successResponse('', [
                'image_url' => getImageURL("{$path}/{$fileName}"),
            ]);
        } catch (Throwable $e) {
            \Log::info('Error store news image', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
                'uid' => $id,
            ]);
        }

        return $this->internalResponse(failMsg());
    }

    /**
     * Находит по id статью для добавления ее в дубликаты на другом языке.
     * @param int $id
     * @param string $lang
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function duplicateInfo(int $id, string $lang, NewsRepository $newsRep): JsonResponse
    {
        $key = 'id';
        if (!validateIntForDB($key, $id)) {
            return $this->validationResponse(__('validation.custom.integer', ['attribute' => $key]));
        }

        $locale = Locale::tryFrom($lang);
        if (!$locale) {
            return $this->validationResponse(__('system.locale_not_found', ['attribute' => $lang]));
        }

        /** @var News|null $newsInfo */
        $newsInfo = $newsRep->findInfoAdmin($id, $this->user(), $locale);
        if (!$newsInfo) {
            return $this->notFoundResponse(__('news.admin.duplicate_not_found'));
        }

        // По сети не передаем основной текст
        $newsInfo->text = '';

        return $this->successResponse('', [
            'duplicate' => $newsInfo,
        ]);
    }

    /**
     * Получает сохраненные картинки, которые добавляли при создании/редактировании новости.
     * @param int $id
     * @return JsonResponse
     */
    public function findUploadedNewsImages(int $id): JsonResponse
    {
        return $this->successResponse('', [
            'images' => getFilesURL(self::PATH_TO_NEWS_UPLOADS.$id),
        ]);
    }

    /**
     * Удаляет из хранилища картинки, которые не использовали в тексте новости.
     * @param ClearUnUsedImagesRequest $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function clearUnusedImages(ClearUnUsedImagesRequest $request, NewsRepository $newsRep): JsonResponse
    {
        $newsID = (int)$request->get('id');

        /** @var News|null $newsInfo */
        $newsInfo = $newsRep->findInfoAdmin($newsID, $this->user());

        $this->deleteImages($newsID, false, $newsInfo);

        return $this->successResponse();
    }

    /**
     * Удаляет картинки новости с сервера.
     * @param int $newsID
     * @param bool $isAllFiles - если true, то рекурсивно все файлы возьмет
     * @param News|null $newsInfo
     * @return void
     */
    private function deleteImages(int $newsID, bool $isAllFiles, ?News $newsInfo = null): void
    {
        $newsImages = getFilesPath(self::PATH_TO_NEWS_UPLOADS.$newsID, $isAllFiles);

        foreach ($newsImages as $image) {
            if ($newsInfo && str_contains($newsInfo->text, $image)) {
                continue;
            }

            $split = explode(self::PATH_TO_NEWS_UPLOADS, $image);
            $this->deleteOneImage($split[1]);
        }
    }

    /**
     * Удаляет одну картинку, которую редактор решил удалить из текста.
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteImage(Request $request): JsonResponse
    {
        $src = $request->get('src', '');
        $split = explode(self::PATH_TO_NEWS_UPLOADS, trim($src));
        if (!isset($split[1])) {
            return $this->badRequestResponse(__('news.admin.edit.no_image'));
        }

        $filePath = $split[1];

        if ($this->deleteOneImage($filePath)) {
            return $this->successResponse();
        }

        return $this->internalResponse(failMsg());
    }

    private function deleteOneImage(string $filePath): bool
    {
        try {
            File::delete(public_path(self::PATH_TO_NEWS_UPLOADS.$filePath));

            return true;
        } catch (Throwable $e) {
            \Log::error('Error delete one news image', [
                'filePath' => $filePath,
                'msg' => $e->getMessage(),
            ]);
        }

        return false;
    }

    /**
     * Подготавливает для записи связи новости с новостями дубликаты на других языках.
     * @param News $newsInfo - изначальная новость
     * @param NewsRepository $newsRep
     * @param array $duplicates - дубликаты изначальной новости
     * @return array|string
     */
    private function prepareDuplicates(News $newsInfo, NewsRepository $newsRep, array $duplicates = []): array|string
    {
        $res = [];
        $user = $this->user();
        $errorLocaleText = __('news.admin.edit.duplicate_locale_not_found');
        foreach ($duplicates as $lang => $duplicateID) {
            $locale = Locale::tryFrom($lang);
            if (!$locale) {
                return $errorLocaleText;
            }

            /** @var News|null $info */
            $info = $newsRep->findInfoAdmin((int)$duplicateID, $user);
            if ($info->locale !== $locale) {
                return $errorLocaleText;
            }

            if ($newsInfo->locale === $locale) {
                return __('news.admin.edit.duplicate_such_locale');
            }

            $res[] = $info->id;
        }

        return $res;
    }

    private function createRelationDuplicates(int $newsID, array $duplicates): void
    {
        foreach ($duplicates as $duplicateID) {
            NewsDuplicate::create([
                'news_id' => $newsID,
                'duplicate_news_id' => $duplicateID,
            ]);

            NewsDuplicate::create([
                'news_id' => $duplicateID,
                'duplicate_news_id' => $newsID,
            ]);
        }
    }

    private function saveMainImage(int $newsID): null|string|JsonResponse
    {
        $file = request()->file('image');
        if (!$file) {
            return null;
        }

        $fileName = sprintf('%s.%s', Str::uuid()->toString(), $file->getClientOriginalExtension());
        $path = self::PATH_TO_NEWS_UPLOADS.$newsID.'/main';
        $fullPath = "{$path}/{$fileName}";

        try {
            $file->move(public_path($path), $fileName);
        } catch (Throwable $e) {
            \Log::info('Error store news main image', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
                'fullPath' => $fullPath,
                'uid' => $newsID,
            ]);

            return $this->internalResponse(__('news.admin.fail_save_main_image'));
        }

        return getImageURL($fullPath);
    }

    /**
     * Удаляет из хранилища неиспользуемые картинки в новости.
     * @param News $newsInfo
     * @param int $imageNewsID
     * @return array
     */
    private function checkAndDeleteUnUsedImages(News $newsInfo, int $imageNewsID): array
    {
        $replacedImages = [];
        $textImages = $this->findUploadedNewsImages($imageNewsID)->getData(true)['data']['images'] ?? [];
        foreach ($textImages as $image) {
            if (!str_contains($newsInfo->text, $image)) {
                $split = explode(self::PATH_TO_NEWS_UPLOADS, $image);
                $this->deleteOneImage($split[1]);
                continue;
            }

            $replacedImages[$image] = str_replace(
                self::PATH_TO_NEWS_UPLOADS.$imageNewsID.'/',
                self::PATH_TO_NEWS_UPLOADS.$newsInfo->id.'/',
                $image
            );
            $newsInfo->text = str_replace($image, $replacedImages[$image], $newsInfo->text);
        }

        return $replacedImages;
    }

    /**
     * Перемещает картинки из временного хранилища в созданную новую новость.
     * @param array $replacedImages
     * @param int $newsID
     * @return void
     * @throws Throwable
     */
    private function moveReplaceImages(array $replacedImages, int $newsID): void
    {
        try {
            foreach ($replacedImages as $oldImage => $newImage) {
                $from = explode(self::PATH_TO_NEWS_UPLOADS, $oldImage)[1];
                $to = explode(self::PATH_TO_NEWS_UPLOADS, $newImage)[1];

                File::move(self::PATH_TO_NEWS_UPLOADS.$from, self::PATH_TO_NEWS_UPLOADS.$to);
            }
        } catch (Throwable $e) {
            \Log::error('Error rename news image from id=0 to another id', [
                'id' => $newsID,
                'msg' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Удаление новости.
     * @param DeleteNewsRequest $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function delete(DeleteNewsRequest $request, NewsRepository $newsRep): JsonResponse
    {
        $id = (int)$request->get('id');

        if (!$newsRep->delete($id)) {
            return $this->internalResponse(__('news.admin.delete.fail'));
        }

        $this->deleteImages($id, true);

        return $this->successResponse(__('news.admin.delete.success'));
    }
}
