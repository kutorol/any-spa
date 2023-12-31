<?php

declare(strict_types=1);

namespace App\Exceptions\Custom;

use App\Exceptions\Entity\CustomException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use ParagonIE\Paseto\Exception\PasetoException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class FactoryCustomException
{
    public static function get(Throwable $e): CustomExceptionInterface
    {
        if (self::isAuth($e)) {
            return new AuthCustomException($e);
        } elseif ($e instanceof ValidationException) {
            return new ValidationCustomException($e);
        } elseif ($e instanceof RouteNotFoundException || $e instanceof MethodNotAllowedHttpException) {
            return new RouteCustomException($e);
        } elseif ($e instanceof QueryException) {
            return new DatabaseCustomException($e);
        } elseif ($e instanceof CustomException) {
            return new DefaultCustomErrorsException($e);
        }

        return new DefaultCustomException($e);
    }

    private static function isAuth(Throwable $e): bool
    {
        return $e instanceof AuthorizationException
            || $e instanceof AuthenticationException
            || $e instanceof PasetoException;
    }
}
