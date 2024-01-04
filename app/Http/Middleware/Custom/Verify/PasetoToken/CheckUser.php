<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\CommonRolesMiddleware;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Route;

final class CheckUser extends CheckAbstract
{
    public function check(): bool
    {
        $u = $this->getData();
        $exists = (bool)$u;
        if ($exists) {
            // устанавливаем юзера, если нашли, чтобы дальше посредники его тоже нашли
            $this->r->merge(['user' => $u]);
            $this->r->setUserResolver(function () use ($u) {
                return $u;
            });
        }

        return $exists;
    }

    public function getData(): ?User
    {
        return User::getCurrentUser();
    }

    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        // все посредники, в которых роли юзера есть (авторизованный как минимум)
        $middlewaresWithUser = array_keys(CommonRolesMiddleware::ROLE_MIDDLEWARES);
        $middlewaresWithUser = array_map('mb_strtolower', array_merge(['auth:api'], $middlewaresWithUser));
        $middlewaresWithUser = array_diff($middlewaresWithUser, ['custom_guest', '']);

        // текущие посредники (может не быть юзера)
        $currentMiddlewares = array_map('mb_strtolower', Route::getCurrentRoute()->gatherMiddleware());
        foreach ($currentMiddlewares as $mw) {
            if (!in_array($mw, $middlewaresWithUser, true)) {
                continue;
            }

            return IsSiteAdmin::getResponse($this->r, 'auth.token.invalid', BaseController::FORBIDDEN_CODE, [
                BaseController::NEED_REFRESH_TOKEN_PARAM => true,
                BaseController::REDIRECT_PARAM => '/login',
            ]);
        }

        return parent::errorResponse();
    }
}
