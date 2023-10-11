<?php

declare(strict_types=1);

namespace App\Exceptions\Custom\AuthExtend;

use Throwable;

// По дефолту данный класс просто возвращает то, что уже есть
class AuthDefaultExtendCustomException implements AuthExtendExceptionInterface
{
    public function getExtendedMessage(array $response, Throwable $e): array
    {
        return $response;
    }
}
