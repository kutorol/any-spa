<?php

declare(strict_types=1);

namespace App\Http\Requests\User\OAuth;

interface OAuthRequestInterface
{
    public function rules(): array;

    public function validated($key = null, $default = null);
}
