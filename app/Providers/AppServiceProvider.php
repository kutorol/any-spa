<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend(
            'num_exists_or_null',
            function ($attribute, $value, $parameters) {
                if (is_null($value) || (int)$value === 0) {
                    return true;
                }

                $validator = Validator::make([$attribute => $value], [
                    $attribute => 'exists:'.implode(',', $parameters),
                ]);

                return !$validator->fails();
            }
        );
    }
}
