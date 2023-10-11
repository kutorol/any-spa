<?php

declare(strict_types=1);

namespace App\Repositories;

use App;
use App\DTO\User\OAuthRegisterDTO;
use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use App\Models\User\BlockedUserInfo;
use App\Models\User\PasswordReset;
use App\Repositories\User\PasetoTokenRepository;
use DB;
use Illuminate\Database\Query\Builder;
use InvalidArgumentException;

class UserRepository
{
    public function create(array $data): User
    {
        $data['password'] = bcrypt($data['password']);
        if (!User::checkRole($data['role'] ?? null)) {
            $data['role'] = User::ROLE_USER;
        }
        $data['locale'] = App::getLocale();

        $user = User::create($data);

        if (!$user->id) {
            throw new InvalidArgumentException(__('user.not_created'), BaseController::BAD_REQUEST_CODE);
        }

        return $user;
    }

    public function createOAuth(OAuthRegisterDTO $dto): User
    {
        $data = [
            'password' => bcrypt(uuid_create()),
            'role' => $dto->getRole(),
            'name' => $dto->getName(),
            'email' => $dto->getEmail(),
            'avatar' => $dto->getImg() ?: null,
            'locale' => $dto->getLocale(),
        ];

        $user = User::create($data);

        if (!$user->id) {
            throw new InvalidArgumentException(__('user.not_created'), BaseController::BAD_REQUEST_CODE);
        }

        return $user;
    }

    public function findByID(int $id): ?User
    {
        return User::withTrashed()->firstWhere('id', '=', $id);
    }

    public function delete(User $user): bool
    {
        return (bool)$user->delete();
    }

    public function update(User $user, array $data): bool
    {
        $user->name = $data['name'] ?? $user->name;
        $user->role = $data['role'] ?? $user->role;

        $changeEmail = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)
            && mb_strtolower($data['email']) !== mb_strtolower($user->email);

        if ($changeEmail) {
            $user->email = $data['email'];
            $user->email_verified_at = null;
        }

        $changePass = mb_strlen($data['password'] ?? '') > 0;
        if ($changePass) {
            $user->password = bcrypt($data['password']);
        }

        $saved = (bool)$user->save();

        if ($saved && $changeEmail) {
            $user->sendEmailVerificationNotification();
        }

        if ($saved && $changePass) {
            app(PasetoTokenRepository::class)->deleteByUID($user->id);
        }

        return $saved;
    }

    // Возвращает запись, которая точно идентифицирует юзера, что это он пытается восстановить пароль
    public function findPassResetByEmail(string $email): null|Builder|PasswordReset
    {
        return PasswordReset::select(['email', 'token'])->where([
            ['email', $email],
        ])->first();
    }

    public function getBlockedComment(User $u): null|Builder|BlockedUserInfo
    {
        return BlockedUserInfo::select(['user_id', 'comment', 'blocked_until'])
            ->where('user_id', $u->id)
            ->first();
    }

    /**
     * @throws \Throwable
     */
    public function clearBlockedUserTx(User $u): void
    {
        DB::transaction(function () use ($u) {
            $u->blocked = false;
            if (!$u->save()) {
                return;
            }

            BlockedUserInfo::where('user_id', $u->id)->delete();
        });
    }
}
