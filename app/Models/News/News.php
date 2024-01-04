<?php

declare(strict_types=1);

namespace App\Models\News;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\News\News.
 *
 * @property null|bool $is_liked - лайкнул ли юзер новость
 * @property int $id
 * @property int $user_id
 * @property Locale $locale
 * @property string $title
 * @property string $image
 * @property string $text
 * @property string $short_text
 * @property string $slug
 * @property int $views
 * @property int $likes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|News newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|News newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|News onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|News query()
 * @method static \Illuminate\Database\Eloquent\Builder|News whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereLikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereShortText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereViews($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|News withoutTrashed()
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\News\NewsLike> $userLikes
 * @property-read int|null $user_likes_count
 * @mixin \Eloquent
 */
class News extends Model
{
    use SoftDeletes;

    protected $table = 'news';

    protected $fillable = [
        'user_id',
        BaseController::LOCALE_PARAM,
        'title',
        'image',
        'text',
        'short_text',
        'slug',
        'views',
        'likes',
    ];

    protected $casts = [
        BaseController::LOCALE_PARAM => Locale::class,
        'views' => 'integer',
        'likes' => 'integer',
    ];

    public function userLikes(): HasMany
    {
        return $this->hasMany(NewsLike::class, 'news_id');
    }
}
