<?php

declare(strict_types=1);

namespace App\Exceptions\Custom\AuthExtend;

use Throwable;

// Расширяет ошибку данными от ошибки Paseto
class AuthPasetoExtendCustomException implements AuthExtendExceptionInterface
{
    public function getExtendedMessage(array $response, Throwable $e): array
    {
        $prefix = 'auth.';
        $response['data'] = array_merge($response['data'], [
            'paseto' => [
                'msg' => str_replace($prefix, '', __($prefix.$e->getMessage())),
            ],
        ]);

        return $response;
    }
}
