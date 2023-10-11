<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Http\Controllers\Api\BaseController;
use Throwable;

class DefaultCustomException implements CustomExceptionInterface
{
    private Throwable $e;

    public function __construct(Throwable $e)
    {
        $this->e = $e;
    }

    public function getExtendedMessage(array $response): array
    {
        return $response;
    }

    public function getHeaderCode(): int
    {
        return BaseController::BAD_REQUEST_CODE;
    }
}
