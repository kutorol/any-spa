<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;

class VerifyEmail
{
    private const EXCLUDE_ROUTES = [
        'verification.send',
        'api.checkInitRequest',
        'api.logout',
        'api.user.changeLocale',
        'seo.page-info',
        'googleOAuth',
        'support.send',
    ];

    /**
     * Мидлварь проверки подтверждения email, когда юзер дергает api.
     * @throws Exception
     */
    public function handle(Request $request, Closure $next)
    {
        /** @var User|null $user */
        $user = User::getCurrentUser();
        if ($user && !$user->email_verified_at && !$request->routeIs(self::EXCLUDE_ROUTES)) {
            return IsSiteAdmin::getResponse($request, 'user.email.no_verification', BaseController::FORBIDDEN_CODE, [
                BaseController::REDIRECT_PARAM => '/verify-email',
            ]);
        }

        return $next($request);
    }
}
