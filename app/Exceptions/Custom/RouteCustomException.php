<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

// Класс расширяет ошибки маршрутов
class RouteCustomException implements CustomExceptionInterface
{
    // @phpstan-ignore-next-line
    public function __construct(Throwable|RouteNotFoundException|MethodNotAllowedHttpException $e)
    {
    }

    public function getExtendedMessage(array $response): array
    {
        $response['msg'] = __('validation.route_not_found');
        $response['statusCode'] = $this->getHeaderCode();

        return $response;
    }

    public function getHeaderCode(): int
    {
        return BaseController::NOT_FOUND_CODE;
    }
}
