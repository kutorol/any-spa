<?php

declare(strict_types=1);

namespace App\Enums\User;

use App\Enums\EnumTrait;
use App\Models\User;

enum RolesEnum: string
{
    use EnumTrait;

    case SITE_ADMIN = 'site_admin';
    case SITE_MANAGER = 'site_manager';

    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case EMPLOYEE = 'employee';

    case USER = 'user';
    case GUEST = 'guest';
    case TEST_USER = 'test_user';

    public static function isRoles(RolesEnum ...$roles): bool
    {
        return in_array(self::getUserRole(), $roles, true);
    }

    private static function getUserRole(): RolesEnum
    {
        $role = User::getCurrentUser()?->role;
        if (!$role) {
            $role = self::GUEST;
        }

        return $role;
    }

    public static function isSiteAdminOrManager(): bool
    {
        return self::isRoles(self::SITE_ADMIN, self::SITE_MANAGER);
    }

    public static function isSiteAdmin(): bool
    {
        return self::isRoles(self::SITE_ADMIN);
    }

    public static function isSiteManager(): bool
    {
        return self::isRoles(self::SITE_MANAGER);
    }
}
