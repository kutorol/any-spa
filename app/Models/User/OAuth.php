<?php

declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\OAuth.
 *
 * @property int $user_id
 * @property string $oauth_id
 * @property string $oauth_email
 * @property string $oauth_title
 * @property string $oauth_locale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth query()
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereOauthEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereOauthId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereOauthLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereOauthTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OAuth whereUserId($value)
 * @mixin \Eloquent
 */
class OAuth extends Model
{
    public const OAUTH_TITLE_GOOGLE = 'google';

    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $table = 'oauth_user_data';

    protected $fillable = [
        'user_id',
        'oauth_id',
        'oauth_email',
        'oauth_title',
        'oauth_locale',
    ];
}
