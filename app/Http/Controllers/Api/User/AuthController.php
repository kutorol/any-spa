<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App;
use App\DTO\User\OAuthRegisterDTO;
use App\Http\Controllers\Api\BaseController;
use App\Http\Middleware\Custom\Verify\VerifyBlockedUser;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\User\OAuth;
use App\Repositories\User\OAuthRepository;
use App\Repositories\User\PasetoTokenRepository;
use App\Repositories\UserRepository;
use DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use ParagonIE\Paseto\Exception\PasetoException;
use Throwable;

class AuthController extends BaseController
{
    // POST Регистрация нового пользователя
    public function register(RegisterRequest $request, PasetoTokenRepository $pasetoRep, UserRepository $userRep): JsonResponse
    {
        $input = $request->validated();

        $data = DB::transaction(function () use ($pasetoRep, $userRep, $input) {
            $user = $userRep->create($input);

            $tokens = $pasetoRep->create($user);
            if (!$tokens) {
                throw new PasetoException(__('auth.token_not_created'));
            }

            return [
              'user' => $user,
              'tokens' => $tokens,
            ];
        });

        event(new Registered($data['user']));

        App::setLocale($data['user']->locale);

        return $this->successResponse(
            __('auth.success_register'),
            $this->prepareUserResponse($data['user'], $data['tokens'], '/verify-email'),
        );
    }

    /**
     * POST Вход в аккаунт
     * @throws Throwable
     * @throws PasetoException
     */
    public function login(LoginRequest $request, PasetoTokenRepository $rep): JsonResponse
    {
        $creds = $request->only(['email', 'password']);

        if (!Auth::attempt($creds)) {
            return $this->forbiddenResponse(__('auth.fail_login'), [
                self::ERR_PARAM => [__('auth.failed')],
            ]);
        }

        $user = $this->user();
        App::setLocale($user->locale ?? App::getLocale());

        $verifyResponse = $this->checkUserOnBlocked($user);
        if ($verifyResponse) {
            return $verifyResponse;
        }

        return $this->successResponse(
            __('auth.success_login'),
            $this->prepareUserResponse($user, $rep->recreateTokenTx($user)),
        );
    }

    // POST Выход из аккаунта
    public function logout(PasetoTokenRepository $rep): JsonResponse
    {
        $uid = $this->getUID();
        if (!$uid) {
            return $this->notFoundResponse(__('user.not_found'));
        }

        $rep->deleteByUID($uid);

        return $this->successResponse(__('auth.logout_success'), [
            self::REDIRECT_PARAM => '/',
        ]);
    }

    // POST Повторная отправка письма с подтверждением
    public function resendEmailVerify(): JsonResponse
    {
        if ($this->user()->hasVerifiedEmail()) {
            return $this->successResponse(__('auth.email.already_verify'));
        }

        $this->user()->sendEmailVerificationNotification();

        return $this->successResponse(__('auth.email.verify_send_again'));
    }

    // Сюда идет запрос с рефреш токеном, чтобы заменить его и нужно просто вернуть success ответ
    // Если рефреш не нужен, то тут просто проверка идет на данные по юзеру
    public function refreshTokenHandle(): JsonResponse
    {
        return $this->successResponse('', [
            self::USER_PARAM => self::getUserData($this->user()),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function registerOauth(OAuthRegisterDTO $dto): JsonResponse
    {
        $userRep = app(UserRepository::class);
        $pasetoRep = app(PasetoTokenRepository::class);
        $oauthRep = app(OAuthRepository::class);

        $data = DB::transaction(function () use ($pasetoRep, $userRep, $oauthRep, $dto) {
            $user = $userRep->createOAuth($dto);

            $oauthRep->create($dto, $user);

            $tokens = $pasetoRep->create($user);
            if (!$tokens) {
                throw new PasetoException(__('auth.token_not_created'));
            }

            return [
                'user' => $user,
                'tokens' => $tokens,
            ];
        });

        event(new Registered($data['user']));

        App::setLocale($dto->getLocale());

        return $this->successResponse(
            __('auth.success_register'),
            $this->prepareUserResponse($data['user'], $data['tokens'], '/verify-email'),
        );
    }

    /**
     * @throws Throwable
     * @throws PasetoException
     */
    public function loginOauth(OAuth $entity): JsonResponse
    {
        $userRep = app(UserRepository::class);
        $u = $userRep->findByID($entity->user_id);
        if (!$u) {
            return $this->notFoundResponse(__('user.not_found'));
        }

        $verifyResponse = $this->checkUserOnBlocked($u);
        if ($verifyResponse) {
            return $verifyResponse;
        }

        App::setLocale($u->locale);

        return $this->successResponse(
            __('auth.success_login'),
            $this->prepareUserResponse($u, app(PasetoTokenRepository::class)->recreateTokenTx($u)),
        );
    }

    /**
     * Проверка юзера на блокировку аккаунта.
     * @throws Throwable
     */
    private function checkUserOnBlocked(?User $u): ?JsonResponse
    {
        if (!$u) {
            return null;
        }

        $verifyBlockResponse = VerifyBlockedUser::getResponse($u);
        if ($verifyBlockResponse) {
            return $verifyBlockResponse;
        }

        return null;
    }

    private function prepareUserResponse(User $user, array $tokens, string $redirectTo = '/'): array
    {
        return [
            self::TOKEN_CHANGED_PARAM => true,
            self::REDIRECT_PARAM => $redirectTo,
            ...$tokens,
            self::USER_PARAM => self::getUserData($user),
        ];
    }

    public static function getUserData(User $u): array
    {
        return [
            ...$u->splitName,
            'full_name' => $u->name,
            'uid' => $u->id,
            'email' => $u->email,
            'role' => $u->role,
            'locale' => $u->locale,
            'is_am_pm' => $u->is_am_pm,
            'phone' => $u->phone,
            'sex' => $u->sex,
            'avatar' => $u->avatar,
            'age' => $u->age,
            'verified_email' => $u->hasVerifiedEmail(),
        ];
    }
}
