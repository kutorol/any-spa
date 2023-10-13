<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Enums\User\RolesEnum;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IsGuest
{
    public const MIDDLEWARE_NAME = 'custom_guest';

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return JsonResponse|RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next)
    {
        if (RolesEnum::isRoles(RolesEnum::ROLE_GUEST)) {
            return $next($request);
        }

        return IsSiteAdmin::getResponse($request, 'general.not_guest');
    }
}
