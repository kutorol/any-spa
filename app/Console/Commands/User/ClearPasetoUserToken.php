<?php

declare(strict_types=1);

namespace App\Console\Commands\User;

use App\Console\Commands\CommandsLogAbstract;
use App\Repositories\User\PasetoTokenRepository;

class ClearPasetoUserToken extends CommandsLogAbstract
{
    public const NAME = 'clear__paseto_user_token';

    protected $signature = self::NAME;

    protected $description = 'Чистим невалидные токены авторизации у юзеров раз в сутки в 00:00';

    public function handle()
    {
        return $this->logMiddleware(function (): bool {
            app(PasetoTokenRepository::class)->clearInvalidTokens();

            return true;
        });
    }
}
