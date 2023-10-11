<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\OAuth;

use App\Http\Requests\User\OAuth\OAuthRequestInterface;
use Illuminate\Http\JsonResponse;

interface OAuthInterface
{
    public function auth(OAuthRequestInterface $request): JsonResponse;
}
