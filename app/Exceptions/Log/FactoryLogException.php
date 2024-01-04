<?php

declare(strict_types=1);

namespace App\Exceptions\Log;

use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\PostTooLargeException;
use ParagonIE\Paseto\Exception\PasetoException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class FactoryLogException
{
    public static function log(Throwable $e): void
    {
        /** @var null|LogExceptionAbstract $log */
        $log = null;
        if ($e instanceof PasetoException) {
            $log = new PasetoLogException($e);
        } elseif ($e instanceof RouteNotFoundException || $e instanceof MethodNotAllowedHttpException) {
            $log = new RouteLogException($e);
        } elseif ($e instanceof PostTooLargeException || $e instanceof QueryException) {
            $log = new SystemLogException($e);
        }

        if (!$log) {
            return;
        }

        $log->log();
    }

    public static function getExtendedData(array $data): array
    {
        return array_merge([
            'uri_path' => request()->getRequestUri(),
            'route_name' => \Route::current()?->getName() ?? '',
            'parameters' => \Route::current()?->parameters() ?? '',
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ], $data);
    }
}
