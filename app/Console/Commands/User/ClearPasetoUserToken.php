<?php

declare(strict_types=1);

namespace App\Console\Commands\User;

use App\Console\Commands\CommandsLogAbstract;
use App\Repositories\User\PasetoTokenRepository;

class ClearPasetoUserToken extends CommandsLogAbstract
{
    protected $signature = 'clear__paseto_user_token';

    protected $description = 'Очищает все невалидные токены авторизации у юзеров';

    public function handle()
    {
        return $this->logMiddleware(function () {
            app(PasetoTokenRepository::class)->clearInvalidTokens();

            return true;
        });
    }
}
