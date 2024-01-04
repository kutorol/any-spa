<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\TechSupport\TechSupportUpdate;
use App\Events\User\ChangeEmail;
use App\Events\User\InitRequestEvent;
use App\Events\User\UserLoginOrRegister;
use App\Events\User\UserLogout;
use App\Listeners\TechSupport\TechSupportUpdateNotification;
use App\Listeners\User\ChangeEmailNotification;
use App\Listeners\User\ClearUserCacheAfterRegistration;
use App\Listeners\User\SetABTestsToUserFromRequest;
use App\Listeners\User\SetCookieConfirmFromRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        InitRequestEvent::class => [
            SetCookieConfirmFromRequest::class,
            SetABTestsToUserFromRequest::class,
        ],
        UserLoginOrRegister::class => [
            SetCookieConfirmFromRequest::class,
            SetABTestsToUserFromRequest::class,
        ],
        // Зарегались
        Registered::class => [
            ClearUserCacheAfterRegistration::class,
            SendEmailVerificationNotification::class,
        ],
        UserLogout::class => [
            SetABTestsToUserFromRequest::class,
        ],
        // Подтвердили email
        Verified::class => [

        ],
        // Пароль успешно сменили после отправки email на сброс
        PasswordReset::class => [

        ],
        // Изменили email
        ChangeEmail::class => [
            // нужно выслать подтверждение email
            ChangeEmailNotification::class,
        ],
        // Статус у запроса в тех. поддержку изменился
        TechSupportUpdate::class => [
            TechSupportUpdateNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
