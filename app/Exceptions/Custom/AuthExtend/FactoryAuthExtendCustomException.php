<?php

declare(strict_types=1);

namespace App\Exceptions\Custom\AuthExtend;

use ParagonIE\Paseto\Exception\PasetoException;
use Throwable;

// Класс расширяет ответ от сервера своими данными от разных авторизационных ошибок
class FactoryAuthExtendCustomException
{
    public static function extend(array $response, Throwable $e): array
    {
        /** @var AuthExtendExceptionInterface $handle */
        $handle = new AuthDefaultExtendCustomException();
        if ($e instanceof PasetoException) {
            $handle = new AuthPasetoExtendCustomException();
        }

        return $handle->getExtendedMessage($response, $e);
    }
}
