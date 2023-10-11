<?php

declare(strict_types=1);

namespace App\Exceptions\Log;

use Throwable;

abstract class LogExceptionAbstract
{
    protected Throwable $e;

    public function __construct(Throwable $e)
    {
        $this->e = $e;
    }

    protected function commonData(): array
    {
        return FactoryLogException::getExtendedData([
            'msg' => $this->e->getMessage(),
            'code' => $this->e->getCode(),
        ]);
    }

    abstract public function log(): void;
}
