<?php

declare(strict_types=1);

namespace App\Enums\Common;

enum Locale: string
{
    case RU = 'ru';
    case EN = 'en';

    public static function values(): array
    {
        return array_map(fn (Locale $status) => $status->value, self::cases());
    }
}
