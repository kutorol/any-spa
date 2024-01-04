<?php

declare(strict_types=1);

namespace App\Enums\TechSupport;

use App\Enums\EnumTrait;

enum TechSupportStatus: string
{
    use EnumTrait;

    case STATUS_CREATED = 'created';
    case STATUS_IN_PROGRESS = 'in_progress';
    case STATUS_DEFERRED = 'deferred'; // отложен
    case STATUS_REJECTED = 'rejected'; // отклонен
    case STATUS_DONE = 'done';

    public static function isCompletedStatus(TechSupportStatus $status): bool
    {
        return $status === self::STATUS_DONE || $status === self::STATUS_REJECTED;
    }
}
