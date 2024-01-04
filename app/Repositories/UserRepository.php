<?php

declare(strict_types=1);

namespace App\Repositories;

use App;
use App\DTO\SearchUserDTO;
use App\DTO\User\OAuthRegisterDTO;
use App\Enums\Common\Locale;
use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use App\Models\User\ABTestUser;
use App\Models\User\BlockedUserInfo;
use App\Models\User\PasswordReset;
use App\Models\User\UserInfo;
use App\Repositories\User\PasetoTokenRepository;
use DB;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use InvalidArgumentException;
use Throwable;

class UserRepository
{
    private const PER_PAGE = 50;
    private const CACHE_KEY_TOTAL_USERS = '{user}:total_users';
    private const CACHE_TTL_TOTAL_USERS = 24 * 60 * 60;

    /**
     * Находит юзеров.
     * @param bool $withDeleted
     * @param SearchUserDTO|null $search
     * @return LengthAwarePaginator
     */
    public function find(bool $withDeleted = false, ?SearchUserDTO $search = null): LengthAwarePaginator
    {
        $handle = $withDeleted ? User::withTrashed() : User::withoutTrashed();

        if (!empty($search?->getIds())) {
            $handle->whereIn('id', $search->getIds());
        }

        if ($search?->getName()) {
            $handle->where('name', 'LIKE', '%'.$search->getName().'%');
        }

        if ($search?->getEmail()) {
            $handle->where('email', 'LIKE', '%'.$search->getEmail().'%');
        }

        return $handle->select(['id', 'name', 'email', 'email_verified_at', 'created_at', 'deleted_at'])
            ->whereIn(
                'role',
                array_map(fn (RolesEnum $role) => $role->value, $search?->getRoles() ?? [RolesEnum::USER])
            )
            ->paginate(self::PER_PAGE);
    }

    /**
     * Регистрация.
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        $data['password'] = bcrypt($data['password']);
        $data[BaseController::LOCALE_PARAM] = App::getLocale();

        $user = User::create($data);

        if (!$user->id) {
            throw new InvalidArgumentException(__('user.not_created'), BaseController::BAD_REQUEST_CODE);
        }

        $userInfo = UserInfo::create(['user_id' => $user->id]);

        if (!$userInfo->user_id) {
            throw new InvalidArgumentException(__('user.not_created'), BaseController::BAD_REQUEST_CODE);
        }

        return $user;
    }

    /**
     * Регистрация OAuth, которая внутри одной транзакции происходит
     * @param OAuthRegisterDTO $dto
     * @return User
     */
    public function createOAuth(OAuthRegisterDTO $dto): User
    {
        $existsUser = $this->findByEmail($dto->getEmail());
        if ($existsUser->id ?? 0) {
            throw new InvalidArgumentException(__('user.not_created_exists'), BaseController::BAD_REQUEST_CODE);
        }

        $user = User::create([
            'password' => bcrypt(uuid_create()),
            'role' => $dto->getRole(),
            'name' => $dto->getName(),
            'email' => $dto->getEmail(),
            'avatar' => $dto->getImg() ?: null,
            BaseController::LOCALE_PARAM => $dto->getLocale(),
        ]);

        $error = new InvalidArgumentException(__('user.not_created'), BaseController::BAD_REQUEST_CODE);
        if (!$user->id) {
            throw $error;
        }

        $userInfo = UserInfo::create([
            'user_id' => $user->id,
            'sex' => $dto->getSex(),
        ]);

        if (!$userInfo->user_id) {
            throw $error;
        }

        return $user;
    }

    /**
     * Сохраняем а/б тесты юзеру одной транзакцией при логине/регистрации/выходе.
     * @param int $userID
     * @param array $tests
     * @return void
     * @throws Throwable
     */
    public function setABTestsUserTx(int $userID, array $tests): void
    {
        DB::transaction(function () use ($userID, $tests) {
            foreach ($tests as $testID => $testValueID) {
                ABTestUser::updateOrCreate([
                    'user_id' => $userID,
                    'ab_test_id' => $testID,
                ], ['ab_test_values_id' => $testValueID]);
            }
        });
    }

    /**
     * Находим юзера по id (удаленного юзера тоже).
     * @param int $id
     * @return User|null
     */
    public function findByID(int $id): ?User
    {
        return User::withTrashed()->firstWhere('id', '=', $id);
    }

    /**
     * Находим юзера по email (удаленного юзера тоже).
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return User::withTrashed()->firstWhere('email', '=', $email);
    }

    /**
     * Удаление юзера.
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return (bool)$user->delete();
    }

    /**
     * Обновление юзера.
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool
    {
        $user->name = $data['name'] ?? $user->name;
        $role = RolesEnum::tryFrom($data['role'] ?? '');
        if ($role) {
            $user->role = $role;
        }

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

    /**
     * Возвращает запись, которая точно идентифицирует юзера, что это он пытается восстановить пароль.
     * @param string $email
     * @return Builder|PasswordReset|null
     */
    public function findPassResetByEmail(string $email): null|Builder|PasswordReset
    {
        return PasswordReset::select(['email', 'token'])->where([
            ['email', $email],
        ])->first();
    }

    /**
     * Возвращаем комментарий админа, почему юзера заблокировали и до какого времени.
     * @param User $u
     * @return Builder|BlockedUserInfo|null
     */
    public function getBlockedComment(User $u): null|Builder|BlockedUserInfo
    {
        return BlockedUserInfo::select(['user_id', 'comment', 'blocked_until'])
            ->where('user_id', $u->id)
            ->first();
    }

    /**
     * Снимаем блокировку с юзера.
     * @throws Throwable
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

    /**
     * Сохраняет подтверждение с политикой по кукам
     * @param User $u
     * @return bool
     */
    public function confirmAgreement(User $u): bool
    {
        $userInfo = $u->userInfo;
        $userInfo->agreement_confirmed_at = now();

        return $userInfo->save();
    }

    /**
     * Изменяет язык пользователя.
     * @param User $user
     * @param Locale $locale
     * @return void
     */
    public function changeLocale(User $user, Locale $locale): void
    {
        App::setLocale($locale->value);
        if ($user->locale === $locale) {
            return;
        }

        $user->locale = $locale;
        $user->save();
    }

    /**
     * Возвращаем сколько всего сейчас юзеров.
     * @return int
     */
    public function getTotalUsers(): int
    {
        $total = (int)(redisGet(self::CACHE_KEY_TOTAL_USERS)[0] ?? 0);
        if ($total) {
            return $total;
        }

        $total = User::count();
        redisSetTTL(self::CACHE_KEY_TOTAL_USERS, $total, self::CACHE_TTL_TOTAL_USERS);

        return $total;
    }

    /**
     * Удаляет кэш "сколько всего юзеров".
     * @return void
     */
    public function deleteTotalUsersCache(): void
    {
        redisDel([self::CACHE_KEY_TOTAL_USERS]);
    }
}
