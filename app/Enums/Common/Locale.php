<?php

declare(strict_types=1);

namespace App\Enums\Common;

use App\Enums\EnumTrait;

enum Locale: string
{
    use EnumTrait;

    case RU = 'ru';
    case EN = 'en';
}
