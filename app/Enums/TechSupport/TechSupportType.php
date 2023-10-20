<?php

declare(strict_types=1);

namespace App\Enums\TechSupport;

enum TechSupportType: string
{
    case TYPE_PROBLEM = 'problem';
    case TYPE_SUGGEST = 'suggest';
    case TYPE_QUESTION = 'question';

    public static function allValues(): array
    {
        return array_map(fn (TechSupportType $status) => $status->value, self::cases());
    }
}
