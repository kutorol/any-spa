<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Exceptions\Custom\AuthExtend\FactoryAuthExtendCustomException;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use ParagonIE\Paseto\Exception\PasetoException;
use Throwable;

// Класс работает с ошибками авторизации
class AuthCustomException implements CustomExceptionInterface
{
    private AuthenticationException|AuthorizationException|PasetoException|Throwable $e;

    public function __construct(Throwable $e)
    {
        $this->e = $e;
    }

    public function getExtendedMessage(array $response): array
    {
        $response['msg'] = __('auth.you_in_forbidden_zone');
        $response['data'] = array_merge($response['data'], [
            // перенаправляем из запрещенной зоны в зону входа
            BaseController::REDIRECT_PARAM => 'login',
        ]);

        // расширяем ошибку
        return FactoryAuthExtendCustomException::extend($response, $this->e);
    }

    public function getHeaderCode(): int
    {
        return BaseController::FORBIDDEN_CODE;
    }
}
