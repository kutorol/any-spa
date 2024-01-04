<?php

declare(strict_types=1);

namespace App\Models\Seo;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Seo\I18Seo.
 *
 * @property int $id
 * @property string $label
 * @property string $value
 * @property Locale $locale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo query()
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|I18nSeo whereValue($value)
 * @mixin \Eloquent
 */
class I18nSeo extends Model
{
    protected $table = 'i18n';

    protected $fillable = [
        'label',
        'value',
        BaseController::LOCALE_PARAM,
    ];

    protected $casts = [
        BaseController::LOCALE_PARAM => Locale::class,
    ];
}
