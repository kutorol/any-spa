<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\News;

use App\Exceptions\Entity\CustomDBException;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\News\LikeNewsRequest;
use App\Models\News\News;
use App\Models\News\NewsLike;
use App\Repositories\News\NewsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends BaseController
{
    /**
     * Избранное в лк юзера.
     * @param Request $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function favorite(Request $request, NewsRepository $newsRep): JsonResponse
    {
        $res = $newsRep->findFavorite($this->user(), getPage($request));

        return $this->successResponse('', preparePaginationResponse('news', $res));
    }

    /**
     * Листинг всех новостей.
     * @param Request $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function index(Request $request, NewsRepository $newsRep): JsonResponse
    {
        $res = $newsRep->find(getPage($request), $this->user());

        return $this->successResponse('', preparePaginationResponse('news', $res));
    }

    /**
     * Конкретная новость.
     * @param int $id
     * @param NewsRepository $newsRep
     * @return JsonResponse
     */
    public function info(int $id, NewsRepository $newsRep): JsonResponse
    {
        $key = 'id';
        if (!validateIntForDB($key, $id)) {
            return $this->validationResponse(
                __('validation.custom.integer', [
                    'attribute' => $key,
                ])
            );
        }

        /** @var News|null $newsInfo */
        $newsInfo = $newsRep->findInfo($id, $this->user());
        if (!$newsInfo) {
            return $this->notFoundResponse(__('news.not_found'));
        }

        $newsRep->updateViews($newsInfo);

        return $this->successResponse('', [
            'newsInfo' => $newsInfo,
            'likes' => $newsRep->findShortLikes($newsInfo),
            'duplicates' => $newsRep->findShortDuplicates($newsInfo, $this->user()),
            'otherNews' => $newsRep->findBeforeAndAfterNews($newsInfo->id, $this->user()),
        ]);
    }

    /**
     * Ставит / снимает лайк.
     * @param LikeNewsRequest $request
     * @param NewsRepository $newsRep
     * @return JsonResponse
     * @throws \Throwable
     */
    public function toggleLike(LikeNewsRequest $request, NewsRepository $newsRep): JsonResponse
    {
        $id = (int)$request->get('id');

        $user = $this->user();
        $res = $newsRep->find(1, $user, $id);
        if (empty($res->items())) {
            return $this->badRequestResponse(__('news.not_found'));
        }

        /** @var News $news */
        $news = $res->items()[0];

        \DB::transaction(function () use (&$news, $id, $user) {
            $totalLikes = (int)$news->likes + ($news->is_liked ? -1 : 1);
            $news->likes = max($totalLikes, 0);

            if (!$news->save()) {
                throw new CustomDBException(failMsg());
            }

            $news->is_liked = !$news->is_liked;
            if ($news->is_liked) {
                NewsLike::create([
                    'user_id' => $user->id,
                    'news_id' => $id,
                ]);
            } else {
                NewsLike::where('news_id', $id)->where('user_id', $user->id)->delete();
            }
        });

        return $this->successResponse('', [
            'news' => $news,
        ]);
    }
}
