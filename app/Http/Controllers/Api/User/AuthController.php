<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App;
use App\DTO\User\OAuthRegisterDTO;
use App\Events\User\UserLoginOrRegister;
use App\Events\User\UserLogout;
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
    /**
     * POST Регистрация нового пользователя.
     * @param RegisterRequest $request
     * @param PasetoTokenRepository $pasetoRep
     * @param UserRepository $userRep
     * @return JsonResponse
     * @throws Throwable
     */
    public function register(RegisterRequest $request, PasetoTokenRepository $pasetoRep, UserRepository $userRep): JsonResponse
    {
        $input = $request->validated();

        /** @var array $data */
        $data = DB::transaction(function () use ($pasetoRep, $userRep, $input) {
            $user = $userRep->create($input);

            $tokens = $pasetoRep->create($user);
            if (!$tokens) {
                throw new PasetoException(__('auth.token.not_created'));
            }

            return [
              'user' => $user,
              'tokens' => $tokens,
            ];
        });

        App::setLocale($data['user']->locale->value);

        event(new UserLoginOrRegister($data['user'], false));
        event(new Registered($data['user']));

        return $this->successResponse(
            __('auth.register.success'),
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
            return $this->forbiddenResponse(__('auth.login.fail'), [
                self::ERR_PARAM => [__('auth.failed')],
            ]);
        }

        $user = $this->user();
        App::setLocale($user->locale->value ?? App::getLocale());

        $verifyResponse = $this->checkUserOnBlocked($user);
        if ($verifyResponse) {
            return $verifyResponse;
        }

        event(new UserLoginOrRegister($user, true));

        return $this->successResponse(
            __('auth.login.success'),
            $this->prepareUserResponse($user, $rep->recreateTokenTx($user)),
        );
    }

    /**
     * POST Выход из аккаунта.
     * @param PasetoTokenRepository $rep
     * @return JsonResponse
     * @throws Throwable
     */
    public function logout(PasetoTokenRepository $rep): JsonResponse
    {
        $user = $this->user();
        if (!$user) {
            return $this->notFoundResponse(__('user.not_found'));
        }

        event(new UserLogout($user));
        $rep->deleteByUID($user->id);

        return $this->successResponse(__('auth.logout.success'), [
            self::REDIRECT_PARAM => '/',
        ]);
    }

    /**
     * Повторная отправка письма с подтверждением
     * @return JsonResponse
     */
    public function resendEmailVerify(): JsonResponse
    {
        if ($this->user()->hasVerifiedEmail()) {
            return $this->successResponse(__('auth.email.already_verify'));
        }

        $this->user()->sendEmailVerificationNotification();

        return $this->successResponse(__('auth.email.verify_send_again'));
    }

    /**
     * Регистрация через OAuth.
     * @throws Throwable
     */
    public function registerOauth(OAuthRegisterDTO $dto): JsonResponse
    {
        $userRep = app(UserRepository::class);
        $pasetoRep = app(PasetoTokenRepository::class);
        $oauthRep = app(OAuthRepository::class);

        App::setLocale($dto->getLocale()->value);

        $data = DB::transaction(function () use ($pasetoRep, $userRep, $oauthRep, $dto) {
            $user = $userRep->createOAuth($dto);

            $oauthRep->create($dto, $user);

            $tokens = $pasetoRep->create($user);
            if (!$tokens) {
                throw new PasetoException(__('auth.token.not_created'));
            }

            return [
                'user' => $user,
                'tokens' => $tokens,
            ];
        });

        event(new UserLoginOrRegister($data['user'], false));
        event(new Registered($data['user']));

        return $this->successResponse(
            __('auth.register.success'),
            $this->prepareUserResponse($data['user'], $data['tokens'], '/verify-email'),
        );
    }

    /**
     * Вход через OAuth.
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

        App::setLocale($u->locale->value);

        event(new UserLoginOrRegister($u, true));

        return $this->successResponse(
            __('auth.login.success'),
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

    /**
     * Возвращает объект юзера для отправки на клиент
     * @param User $u
     * @return array
     * @throws Throwable
     */
    public static function getUserData(User $u): array
    {
        $userInfo = $u->userInfo;

        return [
            ...$u->splitName,
            'full_name' => $u->name,
            'uid' => $u->id,
            'email' => $u->email,
            'role' => $u->role->value,
            self::LOCALE_PARAM => $u->locale->value,
            'is_am_pm' => $userInfo->is_am_pm,
            'phone' => $userInfo->phone,
            'sex' => $userInfo->sex->value,
            'avatar' => $u->userAvatar,
            'age' => $userInfo->age,
            'verified_email' => $u->hasVerifiedEmail(),
            'agreement_confirmed_at' => $userInfo->agreement_confirmed_at,
            'birthday' => $userInfo->birthday?->format('Y-m-d') ?? null,
            'gmt' => $userInfo->gmt,
            'city' => $userInfo->city,
            'ab_tests' => AbTestUserController::getABTests($u),
        ];
    }

    /**
     * @param User $user
     * @param array $tokens
     * @param string $redirectTo
     * @return array
     * @throws Throwable
     */
    private function prepareUserResponse(User $user, array $tokens, string $redirectTo = '/'): array
    {
        return [
            self::LOCALE_PARAM => $user->locale,
            self::TOKEN_CHANGED_PARAM => true,
            self::REDIRECT_PARAM => $redirectTo,
            ...$tokens,
            self::USER_PARAM => self::getUserData($user),
        ];
    }
}
