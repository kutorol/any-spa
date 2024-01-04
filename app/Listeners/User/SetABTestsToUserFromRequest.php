<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Events\User\InitRequestEvent;
use App\Events\User\UserLoginOrRegister;
use App\Events\User\UserLogout;
use App\Repositories\UserRepository;

class SetABTestsToUserFromRequest
{
    /**
     * Сохраняет А/Б тесты юзера из запроса.
     * @param UserLoginOrRegister|UserLogout|InitRequestEvent $event
     * @return void
     * @throws \Throwable
     */
    public function handle(UserLoginOrRegister|UserLogout|InitRequestEvent $event): void
    {
        app(UserRepository::class)->setABTestsUserTx($event->user->id, getUserABTests());
    }
}
