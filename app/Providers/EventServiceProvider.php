<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\TechSupport\TechSupportUpdate;
use App\Listeners\TechSupport\TechSupportUpdateNotification;
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
        // Зарегались
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        // Подтвердили email
        Verified::class => [

        ],
        // Пароль успешно сменили после отправки email на сброс
        PasswordReset::class => [

        ],
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
