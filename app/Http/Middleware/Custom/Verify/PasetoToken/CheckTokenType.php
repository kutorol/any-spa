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
use Illuminate\Support\Facades\Auth;

final class CheckTokenType extends CheckAbstract
{
    private string $tokenType;

    public function init(): void
    {
        $claims = (array)(Auth::getTokenPayload() ?? []);
        $this->tokenType = $claims['type'] ?? '';
    }

    public function check(): bool
    {
        return PasetoToken::checkType($this->tokenType);
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return IsSiteAdmin::getResponse($this->r, 'auth.failed_check_token_type', BaseController::VALIDATION_CODE);
    }

    public function getData(): string
    {
        return $this->tokenType;
    }
}
