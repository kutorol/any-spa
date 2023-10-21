<?php

declare(strict_types=1);

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Providers\Mails\ResetPasswordProvider;
use App\Providers\Mails\VerifyEmailProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /** @var array<string|InterfaceProvider> */
    private const PROVIDERS = [
        VerifyEmailProvider::class,
        ResetPasswordProvider::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        $this->setCustomProviders();
    }

    // Установка собственных провайдеров
    public function setCustomProviders(): void
    {
        /** @var InterfaceProvider $provider */
        foreach (self::PROVIDERS as $provider) {
            (new $provider)->handle();
        }
    }
}
