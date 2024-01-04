<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Http\Controllers\Api\BaseController;
use Throwable;

class DefaultCustomException implements CustomExceptionInterface
{
    // @phpstan-ignore-next-line
    public function __construct(Throwable $e)
    {
    }

    public function getExtendedMessage(array $response): array
    {
        $response['statusCode'] = $this->getHeaderCode();

        return $response;
    }

    public function getHeaderCode(): int
    {
        return BaseController::INTERNAL_ERROR_CODE;
    }
}
