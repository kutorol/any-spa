<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use App\Repositories\User\PasetoTokenRepository;
use App\Repositories\UserRepository;
use DB;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use ParagonIE\Paseto\Exception\PasetoException;

class ForgotController extends BaseController
{
    /**
     * Сброс и установка нового пароля.
     * @param ResetPasswordRequest $request
     * @param PasetoTokenRepository $rep
     * @param UserRepository $userRep
     * @return JsonResponse
     */
    public function reset(ResetPasswordRequest $request, PasetoTokenRepository $rep, UserRepository $userRep): JsonResponse
    {
        $input = $request->validated();
        $passReset = $userRep->findPassResetByEmail($input['email']);
        if (!$passReset || !\Hash::check($input['url_token'], $passReset->token)) {
            return $this->validationResponse(__('auth.pass_forgot_check_token'));
        }

        $input['token'] = $input['url_token'];
        $input = array_diff_key($input, ['url_token' => true]);
        $tokens = null;
        $u = null;
        $response = Password::reset($input, function (User $user, $password) use (&$u, &$tokens, $rep) {
            $user->password = bcrypt($password);

            $tokens = DB::transaction(function () use ($user, $rep) {
                if (!$user->save()) {
                    throw new PasetoException(__('auth.pass_not_reset'));
                }

                $rep->deleteByUID($user->id);

                $tokens = $rep->create($user);
                if (!$tokens) {
                    throw new PasetoException(__('auth.pass_not_reset'));
                }

                return $tokens;
            });

            $u = $user;
        });

        $isError = $response !== Password::PASSWORD_RESET;
        if ($isError || !$tokens) {
            return $this->badRequestResponse(__('auth.pass_not_reset'));
        }

        if ($u) {
            event(new PasswordReset($u));
        }

        return $this->successResponse(__('auth.pass_reset'), [
            self::TOKEN_CHANGED_PARAM => true,
            ...$tokens,
            self::USER_PARAM => AuthController::getUserData($u),
            self::REDIRECT_PARAM => '/',
        ]);
    }

    /**
     * Отсылаем ссылку на восстановления пароля.
     * @param ForgotRequest $request
     * @return JsonResponse
     */
    public function forgot(ForgotRequest $request): JsonResponse
    {
        $response = Password::sendResetLink(['email' => $request->validated()['email']]);

        $isError = $response !== Password::RESET_LINK_SENT;
        if ($isError) {
            return $this->badRequestResponse(__('auth.pass_reset_link_not_send'));
        }

        return $this->successResponse(__('auth.pass_reset_link_send'));
    }
}
