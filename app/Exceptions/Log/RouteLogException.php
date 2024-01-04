<?php

declare(strict_types=1);

namespace App\Exceptions\Log;

class RouteLogException extends LogExceptionAbstract
{
    public function log(): void
    {
        \Log::channel('routes')->info(
            'RouteNotFound',
            $this->commonData(),
        );
    }
}
