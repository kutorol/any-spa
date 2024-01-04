<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

final class SetBearerToken extends CheckAbstract
{
    public function check(): bool
    {
        return trim($this->r->bearerToken() ?? '') !== '';
    }

    // Возвращает данные после успешной проверки метода $this->check()
    public function getData(): string
    {
        return $this->r->bearerToken();
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return IsSiteAdmin::getResponse($this->r, 'auth.you_in_forbidden_zone', BaseController::FORBIDDEN_CODE, [
            BaseController::REDIRECT_PARAM => '/login',
        ]);
    }
}
