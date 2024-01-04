<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\QueryException;
use Throwable;

// Класс расширяет ошибки базы данных и не дает появлятся им на клиенте
class DatabaseCustomException implements CustomExceptionInterface
{
    private QueryException|Throwable $e;

    // @phpstan-ignore-next-line
    public function __construct(Throwable|QueryException $e)
    {
        $this->e = $e;
    }

    public function getExtendedMessage(array $response): array
    {
        $response['msg'] = __('validation.internal_error');
        if (config('app.debug')) {
            $response['data'][BaseController::ERR_PARAM] = [
                $this->e->getMessage(),
            ];

            $response['code'] = $this->e->getCode();
        }

        $response['statusCode'] = $this->getHeaderCode();

        return $response;
    }

    public function getHeaderCode(): int
    {
        return BaseController::INTERNAL_ERROR_CODE;
    }
}
