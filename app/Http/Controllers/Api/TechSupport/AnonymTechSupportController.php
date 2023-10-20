<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\TechSupport;

use App;
use App\DTO\TechSupport\TechSupportDTO;
use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TechSupport\SendRequest;
use App\Repositories\TechSupport\TechSupportRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;

class AnonymTechSupportController extends BaseController
{
    // От юзера создается заявка в тех. поддержку
    public function send(SendRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $data = $request->validated();

        $type = TechSupportType::tryFrom($request->get('type'));
        if (!$type) {
            return $this->badRequestResponse(__('support.not_such_type'));
        }

        $uid = $this->getUID();
        $dto = (new TechSupportDTO())
            ->setLocale(App::getLocale())
            ->setComment($request->get('comment'))
            ->setStatus(TechSupportStatus::STATUS_CREATED)
            ->setUID($uid ?: null)
            ->setType($type)
            ->setEmail($request->get('email'));

        if (!$uid) {
            $user = app(UserRepository::class)->findByEmail($dto->getEmail());
            $user && $dto->setUID($user->id);
        }

        $entity = $repository->create($dto);
        if (!$entity->id) {
            return $this->internalResponse(__('support.error_create'));
        }

        $totalFiles = count($request->allFiles());
        if ($totalFiles === 0) {
            return $this->successResponse(__('support.request_create'));
        }

        try {
            $fileNames = [];
            /** @var UploadedFile[] $files */
            foreach ($request->allFiles() as $files) {
                foreach ($files as $file) {
                    $fileName = sprintf('%s.%s', mb_strtolower(uuid_create()), $file->getClientOriginalExtension());
                    $path = sprintf('uploads/tech-support/%s/%d/', $data['email'], $entity->id);
                    $file->move(storage_path($path), $fileName);
                    $fileNames[] = $fileName;
                }
            }
        } catch (\Throwable $e) {
            \Log::error('Error store attachment tech support', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
                'uid' => $dto->getUID(),
            ]);
        }

        if (!empty($fileNames) && $repository->saveAttachment($entity->id, $fileNames)) {
            return $this->successResponse(__('support.request_create'));
        }

        $repository->delete($entity);

        return $this->internalResponse(__('support.not_save_attachment'));
    }
}
