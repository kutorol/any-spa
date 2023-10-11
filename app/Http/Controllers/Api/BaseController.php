<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
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

    public static function errorResponse(string $msg, array $data = [], int $code = 0): array
    {
        return [
            'status' => false,
            'msg' => $msg,
            'data' => $data,
            'code' => $code,
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
        ];

        return response()->json($response, self::OK_CODE);
    }

    public function sendError(string $msg, array $data = [], int $code = self::NOT_FOUND_CODE): JsonResponse
    {
        return response()->json(self::errorResponse($msg, $data), $code);
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
        return Auth::guard('api')->user() ?? Auth::user() ?? null;
    }

    protected function getUID(): int
    {
        return (int)($this->user()?->id ?? 0);
    }

    protected function checkRoles(string ...$roles): bool
    {
        return in_array(User::getUserRole(), $roles, true);
    }

    public static function isWeb(?Request $r = null): bool
    {
        $r = $r ?: request();

        return !$r->wantsJson() && !$r->is('api/*');
    }
}
