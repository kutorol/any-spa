<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use App\Models\User;
use App\Models\User\PasetoToken;
use App\Repositories\User\PasetoTokenRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

final class CheckToken extends CheckAbstract
{
    private PasetoToken|Model|Builder|null $infoToken = null;

    private ?User $user = null;

    public function init(): void
    {
        $this->user = $this->lastCheckData[CheckUser::class] ?? null;
        /** @var string $tokenType */
        $tokenType = $this->lastCheckData[CheckTokenType::class] ?? null;

        if ($this->user && $tokenType) {
            $this->infoToken = app(PasetoTokenRepository::class)->findByID($this->user->id, $tokenType);
        }
    }

    public function check(): bool
    {
        // если токена нет или он не активен или истек срок хранения токена
        // @phpstan-ignore-next-line
        return !is_null($this->infoToken) && $this->infoToken->isActive();
    }

    public function getData(): ?PasetoToken
    {
        // @phpstan-ignore-next-line
        return $this->infoToken;
    }

    public function beforeErrorResponse(): self
    {
        if ($this->user && is_null($this->infoToken)) {
            app(PasetoTokenRepository::class)->deleteByUID($this->user->id);
        }

        return $this;
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        if (is_null($this->infoToken)) {
            return IsSiteAdmin::getResponse($this->r, 'auth.token_not_exists', BaseController::NOT_FOUND_CODE, [
                BaseController::REDIRECT_PARAM => 'login',
            ]);
        }

        return IsSiteAdmin::getResponse($this->r, 'auth.This token has expired.', BaseController::FORBIDDEN_CODE, [
            BaseController::NEED_REFRESH_TOKEN_PARAM => true,
            BaseController::REDIRECT_PARAM => 'login',
        ]);
    }
}
