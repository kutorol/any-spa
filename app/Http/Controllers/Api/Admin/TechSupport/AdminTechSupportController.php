<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\TechSupport;

use App\Enums\TechSupport\TechSupportStatus;
use App\Events\TechSupport\TechSupportUpdate;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TechSupport\ChangeStatusRequest;
use App\Http\Requests\TechSupport\DeleteRequest;
use App\Models\TechSupport\TechSupport;
use App\Models\TechSupport\TechSupportAttachment;
use App\Repositories\TechSupport\TechSupportRepository;
use File;
use Illuminate\Http\JsonResponse;

class AdminTechSupportController extends BaseController
{
    // Админ изменяет статус заявки
    public function changeStatus(ChangeStatusRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $data = $request->validated();
        $status = TechSupportStatus::tryFrom($data['status']);
        if (!$status) {
            return $this->badRequestResponse(__('support.no_such_status'));
        }

        $id = (int)$data['id'];
        $entity = $repository->findByID($id);
        if (!$entity) {
            return $this->notFoundResponse(__('support.not_found'));
        }

        if (TechSupportStatus::from($entity->status) === $status) {
            return $this->successResponse(__('support.already_has_status'));
        }

        $entity->status = $status->value;
        $res = $entity->save();
        if (!$res) {
            return $this->internalResponse(__('support.not_change_status'));
        }

        $adminComment = $data['comment'] ?? null;
        if (!empty($adminComment)) {
            $repository->createAdminResponse($entity->id, $this->getUID(), $data['comment']);
        }

        // удаляем закрепления
        if (TechSupportStatus::isCompletedStatus($status)) {
            $this->deleteFiles($entity);
        }

        event(new TechSupportUpdate($entity, $adminComment));

        return $this->successResponse(__('support.success_changed_status'));
    }

    // Админ удаляет заявку
    public function delete(DeleteRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $id = (int)$request->get('id');
        $entity = $repository->findByID($id);
        if (!$entity) {
            return $this->notFoundResponse(__('support.not_found'));
        }

        if ($repository->delete($entity)) {
            $this->deleteFiles($entity);

            return $this->successResponse(__('support.deleted'));
        }

        return $this->internalResponse(__('support.not_delete'));
    }

    // удаляет файлы заявки или всю папку от юзера, если она пуста
    private function deleteFiles(TechSupport $entity): void
    {
        if (empty($entity->attachments)) {
            return;
        }

        $pathToFolder = sprintf('uploads/tech-support/%s', $entity->email);
        $path = sprintf('%s/%d', $pathToFolder, $entity->id);

        try {
            File::deleteDirectory(storage_path($path));
        } catch (\Throwable $e) {
            \Log::error('Error delete folder with files attachment tech support', [
                'id' => $entity->id,
                'msg' => $e->getMessage(),
            ]);
        }

        try {
            if (File::isEmptyDirectory(storage_path($pathToFolder))) {
                File::deleteDirectory(storage_path($pathToFolder));
            }
        } catch (\Throwable $e) {
            \Log::error('Error delete main folder with files attachment tech support', [
                'id' => $entity->id,
                'msg' => $e->getMessage(),
            ]);
        }

        /** @var TechSupportAttachment $attachment */
        foreach ($entity->attachments as $attachment) {
            $attachment->delete();
        }
    }
}
