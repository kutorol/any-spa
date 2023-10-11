<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Models\User;

final class CommonRolesMiddleware
{
    public const ROLE_MIDDLEWARES = [
        User::ROLE_SITE_ADMIN => IsSiteAdmin::class,
        User::ROLE_SITE_MANAGER => IsSiteAdminAndManager::class,
        User::ROLE_TEST_USER => IsTestUser::class,
        IsNotTestUser::MIDDLEWARE_NAME => IsNotTestUser::class,
        IsNotGuest::MIDDLEWARE_NAME => IsNotGuest::class,
        IsGuest::MIDDLEWARE_NAME => IsGuest::class,
    ];
}
