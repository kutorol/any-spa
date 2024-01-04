<?php

declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\OldConfirmedEmails.
 *
 * @property int $user_id
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails query()
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OldConfirmedEmails whereUserId($value)
 * @mixin \Eloquent
 */
class OldConfirmedEmails extends Model
{
    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $table = 'old_confirmed_emails';

    protected $fillable = [
        'user_id',
        'email',
    ];
}
