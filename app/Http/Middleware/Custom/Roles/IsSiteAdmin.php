<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use Closure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

class IsSiteAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return JsonResponse|RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next)
    {
        if (RolesEnum::isRoles(RolesEnum::SITE_ADMIN)) {
            return $next($request);
        }

        return self::getResponse($request);
    }

    /**
     * @param Request $request
     * @param string $msg
     * @param int $code
     * @param array $data
     * @return Application|JsonResponse|RedirectResponse|Redirector
     */
    public static function getResponse(Request $request, string $msg = 'user.bad_role', int $code = BaseController::FORBIDDEN_CODE, array $data = []): JsonResponse|Redirector|Application|RedirectResponse
    {
        if (BaseController::isWeb($request)) {
            return Controller::redirect('/');
        }

        return response()->json(
            BaseController::errorResponse(__($msg), $data, $code, $code),
            $code
        );
    }
}
