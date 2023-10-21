<?php

declare(strict_types=1);

namespace App\Models\Seo;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Seo\I18Seo.
 *
 * @property int $id
 * @property string $label
 * @property string $value
 * @property string $locale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo query()
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18Seo whereValue($value)
 * @mixin \Eloquent
 */
class I18Seo extends Model
{
    protected $table = 'i18';

    protected $fillable = [
        'label',
        'value',
        'locale',
    ];
}
