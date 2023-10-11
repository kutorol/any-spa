<?php

declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\BlockedUserInfo.
 *
 * @property int $user_id
 * @property string $comment По какой причине был заблокирован юзер
 * @property \Illuminate\Support\Carbon $blocked_until
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo whereBlockedUntil($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedUserInfo whereUserId($value)
 * @mixin \Eloquent
 */
class BlockedUserInfo extends Model
{
    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $table = 'blocked_user_info';

    protected $fillable = [
        'user_id',
        'comment',
        'blocked_until',
    ];

    protected $casts = [
        'blocked_until' => 'datetime',
    ];
}
