<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Common\Locale;
use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\BaseController;
use App\Models\User\ABTestUser;
use App\Models\User\UserInfo;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Notifications\Notifiable;
use RCerljenko\LaravelPaseto\Traits\HasPaseto;

/**
 * App\Models\User.
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property string|null $avatar
 * @property Locale $locale
 * @property RolesEnum $role
 * @property bool $blocked Юзер был заблокирован
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property array|null $claims Тут храниться payload от токена Paseto
 * @property UserInfo $userInfo - остальная информация по юзеру
 * @property-read null|string $userAvatar - ссылка на автара
 * @property-read null|string $user_avatar - ссылка на автара
 * @property-read array $splitName - тут полное имя раскладывается на составные части от ФИО
 * @property-read array $split_name - тут полное имя раскладывается на составные части от ФИО
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBlocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User withoutTrashed()
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ABTestUser> $abTests
 * @property-read int|null $ab_tests_count
 * @mixin \Eloquent
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasPaseto, HasFactory, Notifiable, SoftDeletes, VerifiesEmails;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'email_verified_at',
        'blocked',
        BaseController::LOCALE_PARAM,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'blocked' => 'boolean',
        BaseController::LOCALE_PARAM => Locale::class,
        'role' => RolesEnum::class,
    ];

    /**
     * Выводит имя разбитое на ФИО.
     * @return array
     */
    public function getSplitNameAttribute(): array
    {
        return getSplitName($this->name ?? '');
    }

    public function getUserAvatarAttribute(): ?string
    {
        return getAvatarURL($this->avatar, $this->updated_at);
    }

    public static function getCurrentUser(): ?self
    {
        // @phpstan-ignore-next-line
        return \Auth::guard('api')->user() ?? \Auth::user() ?? null;
    }

    public function userInfo(): HasOne
    {
        return $this->hasOne(UserInfo::class, 'user_id', 'id');
    }

    public function abTests(): HasMany
    {
        return $this->hasMany(ABTestUser::class, 'user_id');
    }
}
