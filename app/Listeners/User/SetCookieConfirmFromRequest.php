<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Events\User\InitRequestEvent;
use App\Events\User\UserLoginOrRegister;
use App\Repositories\UserRepository;

class SetCookieConfirmFromRequest
{
    public function handle(UserLoginOrRegister|InitRequestEvent $event): void
    {
        // Если в запросе было, что юзер подтвердил согласие с куками и еще в бд нет этого флага,
        // то добавляем флаг подтверждения
        $confirmAgreement = (int)request('confirmAgreement', 0) === 1;
        if ($confirmAgreement && !$event->user->userInfo->agreement_confirmed_at) {
            app(UserRepository::class)->confirmAgreement($event->user);
        }
    }
}
