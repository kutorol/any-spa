<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App\Enums\Common\Locale;
use App\Enums\User\RolesEnum;
use App\Enums\User\SexEnum;
use App\Events\User\ChangeEmail;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\User\ChangeAvatarRequest;
use App\Http\Requests\User\ChangeLocaleRequest;
use App\Http\Requests\User\DeleteUserRequest;
use App\Http\Requests\User\UpdateCurrentPasswordRequest;
use App\Http\Requests\User\UpdateCurrentUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Repositories\User\OldConfirmedEmailsRepository;
use App\Repositories\User\PasetoTokenRepository;
use App\Repositories\UserRepository;
use DB;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use ParagonIE\Paseto\Exception\PasetoException;

class ManageUserController extends BaseController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function create(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $user = $this->userRepository->create($data);

            event(new Registered($user));

            return $this->successResponse(__('user.created'), [
                'userID' => $user->id,
            ]);
        } catch (\Throwable $e) {
            \Log::error(
                'Error manual register',
                array_merge(['error' => $e->getMessage(), 'code' => $e->getCode()], $data)
            );

            return $this->internalResponse($e->getMessage());
        }
    }

    public function delete(DeleteUserRequest $request, PasetoTokenRepository $rep): JsonResponse
    {
        $id = (int)$request->get('id');
        $user = $this->userRepository->findByID($id);
        if (!$user) {
            return $this->notFoundResponse(__('user.not_found'));
        }

        // current user is not admin and user for delete is not user
        if ($user->role != RolesEnum::USER && !RolesEnum::isSiteAdminOrManager()) {
            return $this->forbiddenResponse(__('general.bad_role'));
        }

        try {
            if (!$this->userRepository->delete($user)) {
                return $this->badRequestResponse(__('user.not_deleted'));
            }
        } catch (\Throwable $e) {
            \Log::error('Error delete user', ['error' => $e->getMessage()]);

            return $this->internalResponse($e->getMessage());
        }

        $rep->deleteByUID($user->id);

        return $this->successResponse(__('user.deleted'));
    }

    public function update(UpdateUserRequest $request): JsonResponse
    {
        $data = (array)$request->validated();

        $user = $this->userRepository->findByID((int)$data['id']);
        if (!$user) {
            return $this->notFoundResponse(__('user.not_found'));
        }

        // current user is not admin and user for update is not user
        if ($user->role != RolesEnum::USER && !RolesEnum::isSiteAdminOrManager()) {
            return $this->forbiddenResponse(__('general.bad_role'));
        }

        $changedEmail = isset($data['email']) && mb_strtolower($data['email']) !== mb_strtolower($user->email);

        try {
            if (!$this->userRepository->update($user, $data)) {
                return $this->badRequestResponse(__('user.not_updated'));
            }
        } catch (\Throwable $e) {
            \Log::error('Error update user', ['error' => $e->getMessage()]);

            return $this->internalResponse($e->getMessage());
        }

        if ($changedEmail) {
            return $this->successResponse(__('user.updated_with_email'));
        }

        return $this->successResponse(__('user.updated'));
    }

    /**
     * Из настроек обновление юзера.
     * @param UpdateCurrentUserRequest $request
     * @param PasetoTokenRepository $rep
     * @param UserRepository $userRep
     * @return JsonResponse
     * @throws \Throwable
     */
    public function updateCurrentUser(
        UpdateCurrentUserRequest $request,
        PasetoTokenRepository $rep,
        UserRepository $userRep
    ): JsonResponse {
        $oldConfirmedEmailRep = app(OldConfirmedEmailsRepository::class);
        $user = $this->user();

        $data = $request->validated();

        $oldEmail = mb_strtolower($user->email);
        $user->email = mb_strtolower($data['email']);
        $isChangeEmail = $oldEmail !== mb_strtolower($user->email);
        $wasConfirmed = !is_null($user->email_verified_at);

        if ($isChangeEmail) {
            $user->email_verified_at = null;

            if ($userRep->findByEmail($user->email)?->id > 0) {
                return $this->badRequestResponse(__('user.profile.email_occupied'));
            }

            // если email уже добавлял такой, то не надо его подтверждать
            $oldEmails = $oldConfirmedEmailRep->findOldEmails($user->id);
            if (isset($oldEmails[$user->email])) {
                $user->email_verified_at = now();
            }
        }

        $userInfo = $user->userInfo;
        $user->name = $data['name'];
        $userInfo->is_am_pm = (bool)$data['is_am_pm'];
        $userInfo->phone = isset($data['phone']) ? (int)$data['phone'] : null;
        $userInfo->sex = SexEnum::from($data['sex']);
        $userInfo->birthday = isset($data['birthday']) ? Carbon::parse($data['birthday']) : null;
        $userInfo->gmt = (int)$data['gmt'];
        $userInfo->city = mb_ucfirst($data['city']);
        $user->updated_at = now();

        $tokens = DB::transaction(
            function () use ($user, $userInfo, $oldEmail, $isChangeEmail, $wasConfirmed, $rep, $oldConfirmedEmailRep) {
                if (!$user->save()) {
                    throw new PasetoException(failMsg());
                }

                if (!$userInfo->save()) {
                    throw new PasetoException(failMsg());
                }

                if (!$isChangeEmail) {
                    return null;
                }

                $rep->deleteByUID($user->id);

                $tokens = $rep->create($user);
                if (!$tokens) {
                    throw new PasetoException(failMsg());
                }

                // сохраняем email, если он был уже подтвержден
                $wasConfirmed && $oldConfirmedEmailRep->create($user->id, $oldEmail);

                return $tokens;
            }
        );

        if ($isChangeEmail && !$tokens) {
            return $this->badRequestResponse(failMsg());
        }

        // если не подтверждали ранее email
        !$user->email_verified_at && event(new ChangeEmail($user));

        $text = __('user.profile.success_change');
        if ($isChangeEmail && !$user->email_verified_at) {
            $text = __('user.profile.success_change_email_send', ['email' => $user->email]);
        }

        $redirect = $user->email_verified_at ? [] : [self::REDIRECT_PARAM => '/verify-email'];

        return $this->successResponse($text, [
            self::LOCALE_PARAM => $user->locale->value,
            self::USER_PARAM => AuthController::getUserData($user),
            ...($isChangeEmail ? [
                ...$redirect,
                self::TOKEN_CHANGED_PARAM => true,
                ...$tokens,
            ] : []),
        ]);
    }

    /**
     * Обновление пароля текущего юзера.
     * @param UpdateCurrentPasswordRequest $request
     * @param PasetoTokenRepository $rep
     * @return JsonResponse
     * @throws \Throwable
     */
    public function updateCurrentPassword(
        UpdateCurrentPasswordRequest $request,
        PasetoTokenRepository $rep
    ): JsonResponse {
        $user = $this->user();
        $user->password = bcrypt($request->get('password'));

        /** @var null|array $tokens */
        $tokens = DB::transaction(function () use ($user, $rep) {
            if (!$user->save()) {
                throw new PasetoException(__('auth.pass.fail_change'));
            }

            $rep->deleteByUID($user->id);

            $tokens = $rep->create($user);
            if (!$tokens) {
                throw new PasetoException(__('auth.pass.fail_change'));
            }

            return $tokens;
        });

        if (!$tokens) {
            return $this->badRequestResponse(__('auth.pass.fail_change'));
        }

        event(new PasswordReset($user));

        return $this->successResponse(__('auth.pass.success_change'), [
            self::TOKEN_CHANGED_PARAM => true,
            ...$tokens,
        ]);
    }

    /**
     * Подтверждает согласие конфиденциальности на куки и прочие.
     * @return JsonResponse
     */
    public function confirmAgreement(): JsonResponse
    {
        if (!app(UserRepository::class)->confirmAgreement($this->user())) {
            return $this->internalResponse(__('user.profile.fail_save_confirmed_agreement'));
        }

        return $this->successResponse();
    }

    /**
     * Загрузка нового аватара.
     * @param ChangeAvatarRequest $request
     * @return JsonResponse
     */
    public function changeAvatar(ChangeAvatarRequest $request): JsonResponse
    {
        $user = $this->user();
        /** @var UploadedFile|null $file */
        $file = $request->file('attachment');
        if (!$file) {
            return $this->badRequestResponse(__('user.profile.not_pass_avatar'));
        }

        try {
            $fileName = sprintf('%d.%s', $user->id, $file->getClientOriginalExtension());
            $path = public_path('uploads/user-avatar');
            $file->move($path, $fileName);

            $user->avatar = $fileName;
            $user->updated_at = now();

            if ($user->save()) {
                return $this->successResponse(__('user.profile.avatar_change_success'), [
                    self::USER_PARAM => AuthController::getUserData($user),
                ]);
            }
        } catch (\Throwable $e) {
            \Log::info('Error store user-avatar', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
                'uid' => $user->id,
            ]);
        }

        return $this->internalResponse(__('user.profile.avatar_change_fail'));
    }

    /**
     * Изменение языка юзера.
     * @param ChangeLocaleRequest $request
     * @param UserRepository $userRep
     * @return JsonResponse
     */
    public function changeLocale(ChangeLocaleRequest $request, UserRepository $userRep): JsonResponse
    {
        $locale = Locale::from($request->get(self::LOCALE_PARAM));
        $userRep->changeLocale($this->user(), $locale);

        return $this->successResponse(__('user.profile.change_locale_success'), [
            self::LOCALE_PARAM => $locale->value,
        ]);
    }
}
