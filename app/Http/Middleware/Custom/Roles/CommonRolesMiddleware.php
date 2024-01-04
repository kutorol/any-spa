<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

final class CommonRolesMiddleware
{
    public const ROLE_MIDDLEWARES = [
        'site_admin' => IsSiteAdmin::class,
        'site_manager' => IsSiteAdminAndManager::class,
        'admin' => IsAdmin::class,
        'manager' => IsAdminOrManager::class,
        'employee' => IsEmployee::class,
        'test_user' => IsTestUser::class,
        IsNotTestUser::MIDDLEWARE_NAME => IsNotTestUser::class,
        IsNotGuest::MIDDLEWARE_NAME => IsNotGuest::class,
        IsGuest::MIDDLEWARE_NAME => IsGuest::class,
    ];
}
