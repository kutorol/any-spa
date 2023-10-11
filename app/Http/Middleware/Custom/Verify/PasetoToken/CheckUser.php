<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Models\User;

final class CheckUser extends CheckAbstract
{
    public function check(): bool
    {
        return (bool)$this->getData();
    }

    public function getData(): ?User
    {
        return $this->r->user();
    }
}
