<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Enums\User\RolesEnum;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IsAdmin
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
        if (RolesEnum::isRoles(RolesEnum::ADMIN)) {
            return $next($request);
        }

        return IsSiteAdmin::getResponse($request);
    }
}
