<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public const FORBIDDEN_CODE = 403;
    public const BAD_REQUEST_CODE = 400;
    public const INTERNAL_ERROR_CODE = 500;
    public const NOT_FOUND_CODE = 404;
    public const VALIDATION_CODE = 422;
    public const OK_CODE = 200;

    // параметр, что нужно сделать редирект на указанный url
    public const REDIRECT_PARAM = 'redirect';
    // параметр, в котором хранятся данные об отданных токенах
    public const TOKEN_PARAM = 'token';
    // параметр, чтобы фронт снова сделал запрос на смену токена
    public const NEED_REFRESH_TOKEN_PARAM = 'need_refresh_token';
    // параметр, говорящий, что токены были изменены
    public const TOKEN_CHANGED_PARAM = 'token_changed';
    // параметр, в котором отправляются перечисления ошибок для отображения на фронте
    public const ERR_PARAM = 'errs';
    // параметр, в котором находится инфа о юзере
    public const USER_PARAM = 'user_data';
    // параметр, в котором язык приложения передается
    public const LOCALE_PARAM = 'locale';
    // Заголовок, в котором указан язык клиента
    public const HEADER__X_REQUEST_LOCALE = 'X-REQUEST-LOCALE';
    // Заголовок, в котором если 1, то это бот зашел на сайт
    public const HEADER__X_REQUEST_CRAWLER = 'X-REQUEST-CRAWLER';
    // Заголовок, в котором указаны А/Б тесты юзера
    public const HEADER__X_REQUEST_AB_TESTS = 'X-REQUEST-AB-TESTS';

    public static function errorResponse(string $msg, array $data = [], int $statusCode = 0, int $code = 0): array
    {
        return [
            'status' => false,
            'msg' => $msg,
            'data' => $data,
            'code' => $code,
            'statusCode' => $statusCode,
            'version' => config('app.version'),
        ];
    }

    public function successResponse(string $msg = '', array $data = []): JsonResponse
    {
        return self::successResp($msg, $data);
    }

    public static function successResp(string $msg = '', array $data = []): JsonResponse
    {
        $response = [
            'status' => true,
            'msg' => $msg,
            'data' => $data,
            'statusCode' => self::OK_CODE,
            'version' => config('app.version'),
        ];

        return response()->json($response, self::OK_CODE);
    }

    public function sendError(string $msg, array $data = [], int $code = self::NOT_FOUND_CODE): JsonResponse
    {
        return response()->json(self::errorResponse($msg, $data, $code), $code);
    }

    public function badRequestResponse(string $msg, array $data = []): JsonResponse
    {
        return $this->sendError($msg, $data, self::BAD_REQUEST_CODE);
    }

    public function notFoundResponse(string $msg, array $data = []): JsonResponse
    {
        return $this->sendError($msg, $data, self::NOT_FOUND_CODE);
    }

    public function internalResponse(string $msg, array $data = []): JsonResponse
    {
        return $this->sendError($msg, $data, self::INTERNAL_ERROR_CODE);
    }

    public function forbiddenResponse(string $msg, array $data = []): JsonResponse
    {
        return $this->sendError($msg, $data, self::FORBIDDEN_CODE);
    }

    public function validationResponse(string $msg, array $data = []): JsonResponse
    {
        return $this->sendError($msg, $data, self::VALIDATION_CODE);
    }

    /**
     * @return User|null
     */
    protected function user(): ?User
    {
        return User::getCurrentUser();
    }

    protected function getUID(): int
    {
        return (int)($this->user()?->id ?? 0);
    }

    public static function isWeb(?Request $r = null): bool
    {
        $r = $r ?: request();

        return !$r->wantsJson() && !$r->is('api/*');
    }
}
