<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\TechSupport;

use App;
use App\DTO\TechSupport\TechSupportDTO;
use App\Enums\Common\Locale;
use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;
use App\Http\Controllers\Api\Admin\TechSupport\AdminTechSupportController;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TechSupport\SendRequest;
use App\Repositories\TechSupport\TechSupportRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;

class AnonymTechSupportController extends BaseController
{
    /**
     * От юзера создается заявка в тех. поддержку.
     * @param SendRequest $request
     * @param TechSupportRepository $repository
     * @return JsonResponse
     */
    public function send(SendRequest $request, TechSupportRepository $repository): JsonResponse
    {
        $data = $request->validated();

        $uid = $this->getUID();
        $dto = (new TechSupportDTO())
            ->setLocale(Locale::from(App::getLocale()))
            ->setComment($request->get('comment'))
            ->setStatus(TechSupportStatus::STATUS_CREATED)
            ->setUID($uid ?: null)
            ->setType(TechSupportType::from($data['type']))
            ->setEmail($request->get('email'))
            ->setFromURL($data['from_url']);

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
                    $path = sprintf('uploads/%s/%s/%d/', AdminTechSupportController::FOLDER_UPLOADS, $data['email'], $entity->id);
                    $file->move(public_path($path), $fileName);
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
