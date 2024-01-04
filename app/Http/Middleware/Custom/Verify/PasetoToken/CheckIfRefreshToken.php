<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Http\Controllers\Api\BaseController;
use App\Models\User\PasetoToken;
use App\Repositories\User\PasetoTokenRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use ParagonIE\Paseto\Exception\PasetoException;

final class CheckIfRefreshToken extends CheckAbstract
{
    private ?PasetoToken $infoToken;

    private array $tokens = [];

    public function init(): void
    {
        $this->infoToken = $this->lastCheckData[CheckToken::class] ?? null;
    }

    public function check(): bool
    {
        // если refresh токен, то вернется false, которая станет true при проверке
        return !($this->infoToken?->isRefreshToken() ?? false);
    }

    /**
     * @throws \Throwable
     * @throws PasetoException
     */
    public function beforeErrorResponse(): self
    {
        // если токен для обновления, то обновим его и отправим обратно результат
        $this->tokens = app(PasetoTokenRepository::class)->recreateTokenTx(
            $this->lastCheckData[CheckUser::class] ?? null
        );

        return $this;
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return BaseController::successResp('', [
            BaseController::TOKEN_CHANGED_PARAM => true,
            ...$this->tokens,
        ]);
    }
}
