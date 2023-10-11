<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IsSiteAdminAndManager
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
        if (in_array(User::getUserRole($request), [User::ROLE_SITE_ADMIN, User::ROLE_SITE_MANAGER])) {
            return $next($request);
        }

        return IsSiteAdmin::getResponse($request);
    }
}
