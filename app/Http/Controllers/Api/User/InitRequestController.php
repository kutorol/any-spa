<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App;
use App\Events\User\InitRequestEvent;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\Seo\SeoController;
use Illuminate\Http\JsonResponse;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Throwable;

class InitRequestController extends BaseController
{
    /**
     * Инициализация для анонима.
     * @return JsonResponse
     * @throws Throwable
     */
    public function initAnonymRequest(): JsonResponse
    {
        return $this->successResponse('', [
            ...$this->getInitSeoData(),
            'ab_tests' => AbTestUserController::getABTests(),
        ]);
    }

    /**
     * Инициализация и проверка токенов юзера от клиента
     * Сюда идет запрос с рефреш токеном, чтобы заменить его и нужно просто вернуть success ответ
     * Если рефреш не нужен, то тут просто проверка идет на данные по юзеру.
     * @return JsonResponse
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     * @throws Throwable
     */
    public function initUserRequest(): JsonResponse
    {
        $user = $this->user();
        App::setLocale($user->locale->value);
        event(new InitRequestEvent($user));

        return $this->successResponse('', [
            ...$this->getInitSeoData(),
            self::LOCALE_PARAM => $user->locale,
            self::USER_PARAM => AuthController::getUserData($this->user()),
        ]);
    }

    private function getInitSeoData(): array
    {
        $withSeo = (int)request('withSeo', 0) === 1;
        $seo = [];
        if ($withSeo) {
            $pageInfo = app(SeoController::class)->pageInfo();
            $seo = $pageInfo->getStatusCode() === self::OK_CODE ? $pageInfo->getData(true) : [];
        }

        return $withSeo ? [
            SeoController::SEO_PARAM => $seo['data'][SeoController::SEO_PARAM] ?? [],
        ] : [];
    }
}
