<?php

declare(strict_types=1);

namespace App\Enums\User;

use App\Models\User;

enum RolesEnum
{
    public const ROLE_SITE_ADMIN = 'site_admin';
    public const ROLE_SITE_MANAGER = 'site_manager';

    public const ROLE_GYM_ADMIN = 'gym_admin';
    public const ROLE_GYM_MANAGER = 'gym_manager';
    public const ROLE_GYM_TRAINER = 'gym_trainer';

    public const ROLE_USER = 'user';
    public const ROLE_GUEST = 'guest';
    public const ROLE_TEST_USER = 'test_user';

    public static function roles(): array
    {
        return [
            self::ROLE_SITE_ADMIN,
            self::ROLE_SITE_MANAGER,
            self::ROLE_GYM_ADMIN,
            self::ROLE_GYM_MANAGER,
            self::ROLE_USER,
            self::ROLE_TEST_USER,
        ];
    }

    public static function isRoles(string ...$roles): bool
    {
        return in_array(self::getUserRole(), $roles, true);
    }

    private static function getUserRole(): string
    {
        return User::getCurrentUser()?->role ?? self::ROLE_GUEST;
    }

    public static function isSiteAdminOrManager(): bool
    {
        return self::isRoles(self::ROLE_SITE_ADMIN, self::ROLE_SITE_MANAGER);
    }

    public static function isSiteAdmin(): bool
    {
        return self::isRoles(self::ROLE_SITE_ADMIN);
    }

    public static function isSiteManager(): bool
    {
        return self::isRoles(self::ROLE_SITE_MANAGER);
    }

    public static function checkRole(?string $role = null): bool
    {
        if (!$role) {
            return false;
        }

        return in_array(mb_strtolower($role), self::roles(), true);
    }
}
