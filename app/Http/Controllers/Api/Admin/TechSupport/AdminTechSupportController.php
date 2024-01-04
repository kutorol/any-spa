<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\TechSupport;

use App\Enums\TechSupport\TechSupportStatus;
use App\Events\TechSupport\TechSupportUpdate;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TechSupport\ChangeStatusRequest;
use App\Http\Requests\TechSupport\DeleteRequest;
use App\Models\TechSupport\TechSupport;
use App\Models\TechSupport\TechSupportAdminResponse;
use App\Models\TechSupport\TechSupportAttachment;
use App\Models\User;
use App\Repositories\TechSupport\TechSupportRepository;
use File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminTechSupportController extends BaseController
{
    // Корневая папка, где хранятся вложения от тех. вопросов
    public const FOLDER_UPLOADS = 'tech-support';

    /**
     * Админ изменяет статус заявки и отправляется ответ с опциональным ответом админа.
     * @param ChangeStatusRequest $request
     * @param TechSupportRepository $repository
     * @return JsonResponse
     */
    public function changeStatus(ChangeStatusRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $data = $request->validated();

        $id = (int)$data['id'];
        $entity = $repository->findByID($id);
        if (!$entity) {
            return $this->notFoundResponse(__('support.not_found'));
        }

        $status = TechSupportStatus::from($data['status']);
        if ($entity->status === $status) {
            return $this->validationResponse(__('support.admin.edit.same_status'));
        }

        $entity->status = $status;
        $res = $entity->save();
        if (!$res) {
            return $this->internalResponse(failMsg());
        }

        $adminComment = $data['comment'] ?? null;
        /** @var TechSupportAdminResponse|null $adminResponse */
        $adminResponse = null;
        if (!empty($adminComment)) {
            $adminResponse = $repository->createAdminResponse($entity->id, $this->getUID(), $adminComment, $status);
        } else {
            $adminComment = null;
        }

        // удаляем закрепления
        if (TechSupportStatus::isCompletedStatus($status)) {
            $this->deleteFiles($entity);
        }

        event(new TechSupportUpdate($entity, $adminComment));

        return $this->successResponse(__('support.admin.edit.success'), $adminResponse ? [
            'response' => $this->prepareAdminComment($adminResponse, $this->user()),
        ] : []);
    }

    /**
     * Админ удаляет заявку.
     * @param DeleteRequest $request
     * @param TechSupportRepository $repository
     * @return JsonResponse
     */
    public function delete(DeleteRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $id = (int)$request->get('id');
        $entity = $repository->findByID($id);
        if (!$entity) {
            return $this->notFoundResponse(__('support.not_found'));
        }

        if ($repository->delete($entity)) {
            $this->deleteFiles($entity);

            return $this->successResponse(__('support.admin.deleted'));
        }

        return $this->internalResponse(failMsg());
    }

    /**
     * Удаляет файлы заявки или всю папку от юзера, если она пуста.
     * @param TechSupport $entity
     * @return void
     */
    private function deleteFiles(TechSupport $entity): void
    {
        if (empty($entity->attachments)) {
            return;
        }

        $pathToFolder = sprintf('uploads/%s/%s', self::FOLDER_UPLOADS, $entity->email);
        $path = sprintf('%s/%d', $pathToFolder, $entity->id);

        try {
            File::deleteDirectory(public_path($path));
        } catch (\Throwable $e) {
            \Log::error('Error delete folder with files attachment tech support', [
                'id' => $entity->id,
                'msg' => $e->getMessage(),
            ]);
        }

        $this->deleteIfEmptyDirectory($pathToFolder, $entity->id);

        /** @var TechSupportAttachment $attachment */
        foreach ($entity->attachments as $attachment) {
            $attachment->delete();
        }
    }

    /**
     * Удаляет папку, если там нет файлов.
     * @param string $pathToFolder
     * @param int $entityID
     * @return void
     */
    private function deleteIfEmptyDirectory(string $pathToFolder, int $entityID): void
    {
        try {
            if (File::isEmptyDirectory(public_path($pathToFolder))) {
                File::deleteDirectory(public_path($pathToFolder));
            }
        } catch (\Throwable $e) {
            \Log::error('Error delete main folder with files attachment tech support', [
                'id' => $entityID,
                'msg' => $e->getMessage(),
            ]);
        }
    }

    private function deleteOneAttach(string $filePath, int $entityID): void
    {
        try {
            File::delete(public_path($filePath));
        } catch (\Throwable $e) {
            \Log::error('Error delete one attach tech support', [
                'id' => $entityID,
                'path' => $filePath,
                'msg' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Отдает весь список запросов в тех поддержку.
     * @param Request $request
     * @param TechSupportRepository $rep
     * @return JsonResponse
     */
    public function list(Request $request, TechSupportRepository $rep): JsonResponse
    {
        $res = $rep->find(getPage($request));

        return $this->successResponse('', preparePaginationResponse('problems', $res));
    }

    /**
     * Инфо по конкретной проблеме.
     *
     * @param int $id
     * @param TechSupportRepository $rep
     * @return JsonResponse
     */
    public function info(int $id, TechSupportRepository $rep): JsonResponse
    {
        $key = 'id';
        if (!validateIntForDB($key, $id)) {
            return $this->validationResponse(
                __('validation.custom.integer', ['attribute' => $key])
            );
        }

        $entity = $rep->findByID($id);

        if (!$entity) {
            return $this->notFoundResponse(__('support.not_found'), [
                self::REDIRECT_PARAM => '/admin/tech-support/list',
            ]);
        }

        $attachments = [];
        /** @var TechSupportAttachment $attachment */
        foreach ($entity->attachments as $attachment) {
            $folder = sprintf('%s/%s/%d', self::FOLDER_UPLOADS, $entity->email, $entity->id);
            $attachments[] = [
                'id' => $attachment->id,
                'url' => getImageURL($attachment->file_name, null, $folder),
                'file_name' => $attachment->file_name,
            ];
        }

        $comments = [];
        /* @var TechSupportAdminResponse $comment */
        foreach ($entity->comments() as $comment) {
            $comments[] = $this->prepareAdminComment($comment);
        }

        return $this->successResponse('', [
            'problem' => $entity,
            'attachments' => $attachments,
            'comments' => $comments,
        ]);
    }

    /**
     * Удаляем файл из вложения к запросу.
     * @param DeleteRequest $request
     * @param TechSupportRepository $rep
     * @return JsonResponse
     */
    public function deleteAttach(DeleteRequest $request, TechSupportRepository $rep): JsonResponse
    {
        $id = (int)$request->get('id');

        /** @var TechSupportAttachment|null $attach */
        $attach = $rep->findAttach($id);
        if (!$attach) {
            return $this->notFoundResponse(__('support.admin.delete.not_found_attach'));
        }

        $entity = $attach->techSupportEntity;

        $folder = sprintf('uploads/%s/%s/%d', self::FOLDER_UPLOADS, $entity->email, $entity->id);

        $this->deleteOneAttach("{$folder}/{$attach->file_name}", $entity->id);
        $this->deleteIfEmptyDirectory($folder, $entity->id);

        return $this->successResponse(
            (bool)$attach->delete()
                ? __('support.admin.delete.success')
                : __('support.admin.ok_attach_not_delete')
        );
    }

    private function prepareAdminComment(TechSupportAdminResponse $entity, ?User $user = null): array
    {
        return [
            'comment' => $entity->comment,
            'created_at' => $entity->created_at,
            'user_id' => $entity->user_id,
            'status' => $entity->status,
            'admin_name' => $user->name ?? $entity->name ?? '-/-',
            'avatar' => getAvatarURL($user->avatar ?? null),
        ];
    }
}
