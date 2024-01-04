<?php

declare(strict_types=1);

namespace App\Enums\User;

use App\Enums\EnumTrait;

enum SexEnum: string
{
    use EnumTrait;

    // Мужик
    case MALE = 'male';
    // Баба
    case FEMALE = 'female';
}
