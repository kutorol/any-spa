<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;

class ClearUserCacheAfterRegistration
{
    public function handle(Registered $event): void
    {
        app(UserRepository::class)->deleteTotalUsersCache();
    }
}
