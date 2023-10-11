<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use Throwable;

// Класс расширяет ошибки валидации
class ValidationCustomException implements CustomExceptionInterface
{
    private ValidationException|Throwable $e;

    public function __construct(Throwable $e)
    {
        $this->e = $e;
    }

    public function getExtendedMessage(array $response): array
    {
        $response['msg'] = __('validation.failed_validation');
        $response['data'][BaseController::ERR_PARAM] = [];

        foreach (($this->e->errors() ?? []) as $errors) {
            foreach ($errors as $error) {
                $response['data'][BaseController::ERR_PARAM][] = $error;
            }
        }

        return $response;
    }

    public function getHeaderCode(): int
    {
        return BaseController::VALIDATION_CODE;
    }
}
