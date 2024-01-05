<?php

declare(strict_types=1);

namespace App\Http;

use App\Http\Middleware\Custom\Roles\CommonRolesMiddleware;
use App\Http\Middleware\Custom\SetLangFromUserMiddleware;
use App\Http\Middleware\Custom\SetLangMiddleware;
use App\Http\Middleware\Custom\Verify\VerifyBlockedUser;
use App\Http\Middleware\Custom\Verify\VerifyEmail;
use App\Http\Middleware\Custom\Verify\VerifyPasetoToken;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        Middleware\TrustProxies::class,
        \Illuminate\Http\Middleware\HandleCors::class,
        Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
//            \App\Http\Middleware\EncryptCookies::class,
//            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
//            \Illuminate\Session\Middleware\StartSession::class,
//            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
//            \App\Http\Middleware\VerifyCsrfToken::class,
//            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,

            // ------------ CUSTOM ------------
            // Устанавливаем язык приложения из заголовков
            SetLangMiddleware::class,
            // проверка подтверждения email
            VerifyEmail::class,
            // проверка блокировки юзера
            VerifyBlockedUser::class,
            // проверка токена авторизации
            VerifyPasetoToken::class,
            // Устанавливаем язык приложения из выбранного языка юзера, если юзер найден через токен
            SetLangFromUserMiddleware::class,
        ],
    ];

    /**
     * The application's middleware aliases.
     *
     * Aliases may be used to conveniently assign middleware to routes and groups.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        'auth' => Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,

        // ------------ START ROLES ------------
        ...CommonRolesMiddleware::ROLE_MIDDLEWARES,
        // ------------ END ROLES ------------
    ];
}
