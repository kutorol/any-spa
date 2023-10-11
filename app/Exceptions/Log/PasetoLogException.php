<?php

declare(strict_types=1);

namespace App\Exceptions\Log;

use App\Models\User\PasetoToken;

class PasetoLogException extends LogExceptionAbstract
{
    public function log(): void
    {
        PasetoToken::log()->error(
            'Ошибка авторизации. Попробуйте еще раз',
            $this->commonData()
        );
    }
}
