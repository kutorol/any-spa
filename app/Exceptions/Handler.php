<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Exceptions\Custom\FactoryCustomException;
use App\Exceptions\Entity\CustomException;
use App\Exceptions\Log\FactoryLogException;
use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use ParagonIE\Paseto\Exception\PasetoException;
use Psr\Log\LogLevel;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<Throwable>, LogLevel::*>
     */
    protected $levels = [
        PasetoException::class => LogLevel::INFO,
        QueryException::class => LogLevel::EMERGENCY,
    ];

    /**
     * Get the default context variables for logging.
     *
     * @return array
     */
    protected function context()
    {
        return array_merge(
            parent::context(),
            FactoryLogException::getExtendedData([
                'user_id' => (int)(User::getCurrentUser()?->id ?? 0),
            ])
        );
    }

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Логируем некоторые ошибки не по стандарту
        $this->reportable(function (PasetoException|RouteNotFoundException|QueryException $e) {
            // не логируем по стандарту flow данные ошибки
            return false;
        });

        $this->reportable(function (Throwable $e) {});
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $e
     * @return JsonResponse|Response
     * @throws Throwable
     */
    public function render($request, Throwable $e): JsonResponse|Response
    {
        FactoryLogException::log($e);

        // на web оставляем стандартное поведение
        if (BaseController::isWeb($request)) {
            return parent::render($request, $e);
        }

        $needTranslate = !($e instanceof CustomException);

        $response = BaseController::errorResponse(
            $needTranslate ? __($e->getMessage()) : $e->getMessage(),
            [],
            BaseController::INTERNAL_ERROR_CODE,
            (int)$e->getCode()
        );

        $ex = FactoryCustomException::get($e);

        return response()->json(
            $ex->getExtendedMessage($response),
            $ex->getHeaderCode(),
        );
    }
}
