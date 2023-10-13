<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Enums\User\RolesEnum;

final class CommonRolesMiddleware
{
    public const ROLE_MIDDLEWARES = [
        RolesEnum::ROLE_SITE_ADMIN => IsSiteAdmin::class,
        RolesEnum::ROLE_SITE_MANAGER => IsSiteAdminAndManager::class,
        RolesEnum::ROLE_TEST_USER => IsTestUser::class,
        IsNotTestUser::MIDDLEWARE_NAME => IsNotTestUser::class,
        IsNotGuest::MIDDLEWARE_NAME => IsNotGuest::class,
        IsGuest::MIDDLEWARE_NAME => IsGuest::class,
    ];
}
