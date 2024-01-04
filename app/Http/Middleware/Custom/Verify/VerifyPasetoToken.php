<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify;

use App\Http\Middleware\Custom\Verify\PasetoToken\CheckAbstract;
use App\Http\Middleware\Custom\Verify\PasetoToken\CheckEqBearer;
use App\Http\Middleware\Custom\Verify\PasetoToken\CheckIfRefreshToken;
use App\Http\Middleware\Custom\Verify\PasetoToken\CheckToken;
use App\Http\Middleware\Custom\Verify\PasetoToken\CheckTokenType;
use App\Http\Middleware\Custom\Verify\PasetoToken\CheckUser;
use App\Http\Middleware\Custom\Verify\PasetoToken\SetBearerToken;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VerifyPasetoToken
{
    /**
     * Проверяем токен авторизации.
     *
     * @param Request $request
     * @param Closure $next
     * @return JsonResponse|RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next): Response|JsonResponse|RedirectResponse
    {
        $checks = [
            // Проверяет и возвращает юзера (если юзера нет, то проверка идет дальше)
            CheckUser::class,
            // Проверяет, что существует и устанавливает Bearer токен
            SetBearerToken::class,
            // Проверяет и возвращает тип токена
            CheckTokenType::class,
            // Проверяет и возвращает сам токен из бд
            CheckToken::class,
            // Проверяет, что токен такой же, как и передали его в браузере
            // ничего не возвращает
            CheckEqBearer::class,
            // Проверяет, что это токен обновления. Обновляет токены и возвращает их юзеру
            CheckIfRefreshToken::class,
        ];

        $lastData = [];

        foreach ($checks as $checkClassName) {
            /** @var CheckAbstract $handle */
            $handle = new $checkClassName($request, $next, $lastData);
            if (!$handle->check()) {
                return $handle->beforeErrorResponse()->errorResponse();
            }

            $lastData[$checkClassName] = $handle->getData();
        }

        return $next($request);
    }
}
