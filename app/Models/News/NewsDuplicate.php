<?php

declare(strict_types=1);

namespace App\Models\News;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\News\NewsDuplicate.
 *
 * @property int $news_id
 * @property int $duplicate_news_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate whereDuplicateNewsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate whereNewsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsDuplicate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class NewsDuplicate extends Model
{
    protected $table = 'news_duplicate';

    // у таблицы нет первичного ключа
    protected $primaryKey = null;

    // не нужно инкрементить при добавлении
    public $incrementing = false;

    protected $fillable = [
        'news_id',
        'duplicate_news_id',
    ];
}
