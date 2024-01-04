<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify;

use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Roles\IsSiteAdmin;
use App\Models\User;
use App\Repositories\UserRepository;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Проверяем на блокировку юзера
class VerifyBlockedUser
{
    /**
     * @throws \Throwable
     */
    public function handle(Request $request, Closure $next)
    {
        /** @var User $u */
        $u = User::getCurrentUser();
        $response = self::getResponse($u, $request);
        if ($response) {
            return $response;
        }

        return $next($request);
    }

    /**
     * Если юзер заблокирован и блокировка еще активна, то вернется response, иначе null.
     * @throws \Throwable
     */
    public static function getResponse(?User $u, ?Request $request = null): ?JsonResponse
    {
        if (!$u || !$u->blocked) {
            return null;
        }

        $request = $request ?: request();

        $userRep = app(UserRepository::class);
        $blockedEntity = $userRep->getBlockedComment($u);
        if (!$blockedEntity) {
            return null;
        }

        $leftSeconds = now()->diffInRealSeconds($blockedEntity->blocked_until, false);
        if ($leftSeconds <= 0) {
            $userRep->clearBlockedUserTx($u);

            return null;
        }

        $errors = [
            sprintf('%s: %s', __('user.block.comment_head'), $blockedEntity->comment),
            sprintf('%s: %s', __('user.block.until'), $blockedEntity->blocked_until->diffForHumans()),
        ];

        return IsSiteAdmin::getResponse($request, 'user.block.title', BaseController::FORBIDDEN_CODE, [
            BaseController::ERR_PARAM => $errors,
        ]);
    }
}
