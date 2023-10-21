<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read int|null $tokens_count
 * @property-read array $splitName - тут полное имя раскладывается на составные части от ФИО
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection $clients
 * @property-read int|null $clients_count
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 * @property string $phone
 * @property int $age
 * @property string $sex
 * @property-read array $split_name  - тут полное имя раскладывается на составные части от ФИО
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSex($value)
 * @property string $avatar
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAvatar($value)
 * @property bool $is_am_pm Как юзеру выводить часы работы
 * @property array|null $claims Тут храниться payload от токена Paseto
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAmPm($value)
 * @property bool $blocked Юзер был заблокирован
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBlocked($value)
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLocale($value)
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
        'phone',
        'age',
        'sex',
        'avatar',
        'is_am_pm',
        'email_verified_at',
        'blocked',
        'locale',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'email_verified_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_am_pm' => 'boolean',
        'blocked' => 'boolean',
        'locale' => 'string',
    ];

    /**
     * Выводит имя разбитое на ФИО.
     * @return array
     */
    public function getSplitNameAttribute(): array
    {
        $fio = explode(' ', $this->name ?? '');

        return [
            'first_name' => $fio[1] ?? '',
            'last_name' => $fio[0] ?? '',
            'surname' => $fio[2] ?? '',
        ];
    }

    public static function getCurrentUser(): ?self
    {
        // @phpstan-ignore-next-line
        return \Auth::guard('api')->user() ?? \Auth::user() ?? null;
    }
}
