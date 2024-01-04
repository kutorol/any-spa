<?php

declare(strict_types=1);

namespace App\Repositories\TechSupport;

use App\DTO\TechSupport\TechSupportDTO;
use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;
use App\Http\Controllers\Api\BaseController;
use App\Models\TechSupport\TechSupport;
use App\Models\TechSupport\TechSupportAdminResponse;
use App\Models\TechSupport\TechSupportAttachment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class TechSupportRepository
{
    private const PER_PAGE = 30;

    // Создает запрос в тех. поддержку
    public function create(TechSupportDTO $dto): TechSupport
    {
        return TechSupport::create([
            'email' => $dto->getEmail(),
            'user_id' => $dto->getUID(),
            'type' => $dto->getType(),
            'status' => $dto->getStatus(),
            'comment' => $dto->getComment(),
            BaseController::LOCALE_PARAM => $dto->getLocale(),
            'from_url' => $dto->getFromURL(),
            'ip' => $dto->getIp(),
            'user_agent' => $dto->getUserAgent(),
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
        return TechSupport::select([
            'id', 'email', 'user_id', BaseController::LOCALE_PARAM, 'type', 'status', 'comment',
            'from_url', 'user_agent', 'ip', 'created_at', 'updated_at',
        ])
            ->firstWhere('id', $id);
    }

    // Создает ответ админа на запрос в тех. поддержку
    public function createAdminResponse(int $id, int $uid, string $comment, TechSupportStatus $status): TechSupportAdminResponse
    {
        return TechSupportAdminResponse::create([
            'tech_support_id' => $id,
            'user_id' => $uid,
            'comment' => $comment,
            'status' => $status,
        ]);
    }

    public function find(int $page = 1): LengthAwarePaginator
    {
        return TechSupport::select(['id', 'email', 'user_id', 'type', 'status', 'comment', BaseController::LOCALE_PARAM, 'created_at', 'updated_at'])
            ->orderByRaw(
                'CASE
                    WHEN status = ? THEN 5
                    WHEN status = ? THEN 4
                    WHEN status = ? THEN 3
                    WHEN status = ? THEN 2
                    WHEN status = ? THEN 1
                ELSE 0
                END DESC, 
                CASE 
                    WHEN type = ? THEN 3
                    WHEN type = ? THEN 2
                    WHEN type = ? THEN 1
                END DESC,
                id DESC',
                [
                    TechSupportStatus::STATUS_IN_PROGRESS,
                    TechSupportStatus::STATUS_CREATED,
                    TechSupportStatus::STATUS_DEFERRED,
                    TechSupportStatus::STATUS_REJECTED,
                    TechSupportStatus::STATUS_DONE,

                    TechSupportType::TYPE_PROBLEM,
                    TechSupportType::TYPE_QUESTION,
                    TechSupportType::TYPE_SUGGEST,
            ]
            )
            ->paginate(self::PER_PAGE, [], 'page', $page);
    }

    public function findAttach(int $id): TechSupportAttachment|Model|null
    {
        return TechSupportAttachment::where('id', $id)->first();
    }
}
