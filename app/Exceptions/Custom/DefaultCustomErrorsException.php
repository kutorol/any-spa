<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Exceptions\Entity\CustomValidationException;
use App\Http\Controllers\Api\BaseController;
use Throwable;

class DefaultCustomErrorsException implements CustomExceptionInterface
{
    private Throwable $e;

    // @phpstan-ignore-next-line
    public function __construct(Throwable $e)
    {
        $this->e = $e;
    }

    public function getExtendedMessage(array $response): array
    {
        $response['statusCode'] = $this->getHeaderCode();

        return $response;
    }

    public function getHeaderCode(): int
    {
        if ($this->e instanceof CustomValidationException) {
            return BaseController::VALIDATION_CODE;
        }

        return BaseController::INTERNAL_ERROR_CODE;
    }
}
