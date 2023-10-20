<?php

declare(strict_types=1);

namespace App\Repositories\TechSupport;

use App\DTO\TechSupport\TechSupportDTO;
use App\Models\TechSupport\TechSupport;
use App\Models\TechSupport\TechSupportAdminResponse;
use App\Models\TechSupport\TechSupportAttachment;

class TechSupportRepository
{
    // Создает запрос в тех. поддержку
    public function create(TechSupportDTO $dto): TechSupport
    {
        return TechSupport::create([
            'email' => $dto->getEmail(),
            'user_id' => $dto->getUID(),
            'type' => $dto->getType()->value,
            'status' => $dto->getStatus()->value,
            'comment' => $dto->getComment(),
            'locale' => $dto->getLocale(),
        ]);
    }

    public function delete(TechSupport $entity): bool
    {
        return (bool)$entity->delete();
    }

    public function saveAttachment(int $id, array $fileNames): bool
    {
        $attachments = [];
        foreach ($fileNames as $fn) {
            $attachments[] = TechSupportAttachment::create([
                'file_name' => $fn,
                'tech_support_id' => $id,
            ]);
        }

        if (count($attachments) !== count($fileNames)) {
            foreach ($attachments as $attachment) {
                $attachment->delete();
            }

            return false;
        }

        return true;
    }

    public function findByID(int $id): ?TechSupport
    {
        return TechSupport::select(['id', 'email', 'user_id', 'locale', 'type', 'status', 'comment', 'created_at', 'updated_at'])->firstWhere('id', $id);
    }

    // Создает ответ админа на запрос в тех. поддержку
    public function createAdminResponse(int $id, int $uid, string $comment): TechSupportAdminResponse
    {
        return TechSupportAdminResponse::create([
            'tech_support_id' => $id,
            'user_id' => $uid,
            'comment' => $comment,
        ]);
    }
}
