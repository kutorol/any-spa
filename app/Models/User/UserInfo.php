<?php

declare(strict_types=1);

namespace App\Models\User;

use App\Enums\User\SexEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\UserInfo.
 *
 * @property int $user_id
 * @property SexEnum $sex
 * @property null|int $phone
 * @property int $age
 * @property int $gmt
 * @property null|string $city
 * @property \Illuminate\Support\Carbon|null $birthday
 * @property \Illuminate\Support\Carbon|string $agreement_confirmed_at Дата, когда юзер дал согласие на политику конфиденциальности
 * @property bool $is_am_pm Как юзеру выводить часы работы
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereAge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereAgreementConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereBirthday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereGmt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereIsAmPm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereSex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInfo whereUserId($value)
 * @property-read User $user
 * @mixin \Eloquent
 */
class UserInfo extends Model
{
    protected $table = 'user_info';

    // у таблицы нет первичного ключа
    protected $primaryKey = 'user_id';

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    // не нужны даты
    public $timestamps = false;

    protected $casts = [
        'birthday' => 'date',
        'is_am_pm' => 'boolean',
        'agreement_confirmed_at' => 'datetime',
        'sex' => SexEnum::class,
    ];

    protected $fillable = [
        'user_id',
        'phone',
        'age',
        'sex',
        'city',
        'is_am_pm',
        'agreement_confirmed_at',
        'birthday',
        'gmt',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // 'user_id' - ваш внешний ключ
    }
}
