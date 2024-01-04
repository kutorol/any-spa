<?php

declare(strict_types=1);

namespace App\Models\AB;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\AB\ABTest.
 *
 * @property int $id
 * @property string $key
 * @property int $total_percent_from_users
 * @property int $total_users_in_test
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property bool $active
 * @property-read Collection<int, ABTestValue> $values
 * @property-read int|null $values_count
 * @property string|null $comment
 * @property int $max_count_users_in_test
 * @property null|ABTestValue[] $test_values
 * @method static Builder|ABTest newModelQuery()
 * @method static Builder|ABTest newQuery()
 * @method static Builder|ABTest query()
 * @method static Builder|ABTest whereCreatedAt($value)
 * @method static Builder|ABTest whereId($value)
 * @method static Builder|ABTest whereKey($value)
 * @method static Builder|ABTest whereTotalPercentFromUsers($value)
 * @method static Builder|ABTest whereTotalUserInTest($value)
 * @method static Builder|ABTest whereUpdatedAt($value)
 * @method static Builder|ABTest whereActive($value)
 * @method static Builder|ABTest whereMaxCountUsersInTest($value)
 * @method static Builder|ABTest whereComment($value)
 * @method static Builder|ABTest whereTotalUsersInTest($value)
 * @mixin Eloquent
 */
class ABTest extends Model
{
    protected $table = 'ab_test_group';

    protected $fillable = [
        'key',
        'total_percent_from_users',
        'total_users_in_test',
        'max_count_users_in_test',
        'active',
        'comment',
    ];

    public function values(): HasMany
    {
        return $this->hasMany(ABTestValue::class, 'ab_test_id')->orderBy('id', 'asc');
    }
}
