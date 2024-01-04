<?php

declare(strict_types=1);

namespace App\Enums\TechSupport;

use App\Enums\EnumTrait;

enum TechSupportType: string
{
    use EnumTrait;

    case TYPE_PROBLEM = 'problem';
    case TYPE_SUGGEST = 'suggest';
    case TYPE_QUESTION = 'question';
}
