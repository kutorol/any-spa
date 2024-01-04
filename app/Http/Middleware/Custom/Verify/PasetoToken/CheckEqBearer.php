<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use App\Models\User\PasetoToken;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

final class CheckEqBearer extends CheckAbstract
{
    private ?PasetoToken $infoToken;

    private ?string $token;

    public function init(): void
    {
        $this->infoToken = $this->lastCheckData[CheckToken::class] ?? null;
        $this->token = $this->lastCheckData[SetBearerToken::class] ?? null;
    }

    public function check(): bool
    {
        return $this->token === ($this->infoToken->token ?? 'no_token_bd');
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return IsSiteAdmin::getResponse($this->r, 'auth.token.invalid', BaseController::FORBIDDEN_CODE, [
            BaseController::NEED_REFRESH_TOKEN_PARAM => true,
            BaseController::REDIRECT_PARAM => '/login',
        ]);
    }
}
