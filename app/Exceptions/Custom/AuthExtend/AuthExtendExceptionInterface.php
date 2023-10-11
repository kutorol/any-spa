<?php

declare(strict_types=1);

namespace App\Exceptions\Custom\AuthExtend;

use Throwable;

interface AuthExtendExceptionInterface
{
    public function getExtendedMessage(array $response, Throwable $e): array;
}
