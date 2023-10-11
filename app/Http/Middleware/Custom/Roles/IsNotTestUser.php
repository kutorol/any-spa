<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Roles;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IsNotTestUser
{
    public const MIDDLEWARE_NAME = 'not_test_user';

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return JsonResponse|RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next)
    {
        if (User::getUserRole($request) !== User::ROLE_TEST_USER) {
            return $next($request);
        }

        return IsSiteAdmin::getResponse($request);
    }
}
