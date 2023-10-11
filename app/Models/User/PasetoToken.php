<?php

declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Psr\Log\LoggerInterface;

/**
 * App\Models\User\PasetoToken.
 *
 * @property int $user_id
 * @property string $token
 * @property bool $active
 * @property string $token_type
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $expires_at
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken query()
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereTokenType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasetoToken whereUserId($value)
 * @mixin \Eloquent
 */
class PasetoToken extends Model
{
    use HasFactory;

    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    // обновления ts отключено
    public $timestamps = false;

    // в какой канал логировать ошибки и т.д.
    public const LOG_CHANNEL = 'paseto';
    // тип токена для доступа к сайту
    public const ACCESS_TYPE = 'access_token';
    // тип токена для получения нового токена для доступа к сайту
    public const REFRESH_TYPE = 'refresh_token';

    protected $table = 'paseto_user_token';

    protected $fillable = [
        'user_id',
        'token',
        'active',
        'token_type',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'active' => 'boolean',
    ];

    public function isRefreshToken(): bool
    {
        return $this->token_type === self::REFRESH_TYPE;
    }

    // активен ли еще текущей токен?
    public function isActive(): bool
    {
        return $this->active && !now()->isAfter($this->expires_at);
    }

    // проверка типа токена
    public static function checkType(string $tokenType): bool
    {
        return in_array(mb_strtolower($tokenType), [self::ACCESS_TYPE, self::REFRESH_TYPE], true);
    }

    public static function log(): LoggerInterface
    {
        return \Log::channel(self::LOG_CHANNEL);
    }
}
