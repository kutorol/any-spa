<?php

declare(strict_types=1);

namespace App\Enums;

trait EnumTrait
{
    public static function values(): array
    {
        return array_map(fn (self $status) => $status->value, self::cases());
    }
}
