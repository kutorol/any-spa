<?php

declare(strict_types=1);

namespace App\Exceptions\Log;

class SystemLogException extends LogExceptionAbstract
{
    public function log(): void
    {
        //emergency
        \Log::channel('emergency')->error(
            'SystemError',
            $this->commonData(),
        );
    }
}
