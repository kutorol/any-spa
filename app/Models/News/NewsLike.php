<?php

declare(strict_types=1);

namespace App\Models\News;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\News\NewsLike.
 *
 * @property int $news_id
 * @property int $user_id
 * @property null|string $avatar - аватарка юзера
 * @property null|string $name - полное имя юзера юзера
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike whereNewsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsLike whereUserId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\News\News> $news
 * @property-read int|null $news_count
 * @mixin \Eloquent
 */
class NewsLike extends Model
{
    protected $table = 'news_like';

    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $fillable = [
        'news_id',
        'user_id',
    ];

    public function news()
    {
        // 'news' - на какую таблицу ссылаемся
        // 'news_id' - какой из текущей таблицы брать ключ
        // 'id' - какой foreign ключ брать из запрашиваемой таблицы
        return $this->belongsToMany(News::class, 'news', 'news_id', 'id');
    }
}
