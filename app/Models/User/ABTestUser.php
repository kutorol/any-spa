<?php

declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User\ABTestUser.
 *
 * @property int $user_id
 * @property int $ab_test_values_id
 * @property int $ab_test_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser whereAbTestValuesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestUser whereAbTestId($value)
 * @mixin \Eloquent
 */
class ABTestUser extends Model
{
    protected $table = 'user_value_ab_test';

    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'ab_test_id',
        'ab_test_values_id',
    ];
}
