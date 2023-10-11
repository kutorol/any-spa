<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use Throwable;

interface CustomExceptionInterface
{
    public function __construct(Throwable $e);

    // Расширяет ответ от сервера с дополнительными данными
    public function getExtendedMessage(array $response): array;

    // Возвращает код ответа сервера
    public function getHeaderCode(): int;
}
