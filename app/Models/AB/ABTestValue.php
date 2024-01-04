<?php

declare(strict_types=1);

namespace App\Models\AB;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AB\ABTestValue.
 *
 * @property int $id
 * @property int $ab_test_id
 * @property int $total_user_with_value
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue query()
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereAbTestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ABTestValue whereTotalUserWithValue($value)
 * @mixin \Eloquent
 */
class ABTestValue extends Model
{
    protected $table = 'ab_test_values';

    protected $fillable = [
        'ab_test_id',
        'total_user_with_value',
        'value',
    ];
}
