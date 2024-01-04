<?php

declare(strict_types=1);

namespace App\Models\FeatureToggle;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FeatureToggle\FeatureToggle.
 *
 * @property int $id
 * @property string $name
 * @property string $value
 * @property string $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle query()
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeatureToggle whereValue($value)
 * @mixin \Eloquent
 */
class FeatureToggle extends Model
{
    protected $table = 'feature_toggle';

    protected $fillable = [
        'name',
        'value',
        'comment',
    ];
}
