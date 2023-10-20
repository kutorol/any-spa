<?php

declare(strict_types=1);

namespace App\Models\TechSupport;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\TechSupport\TechSupport.
 *
 * @property int $id
 * @property string $email
 * @property int|null $user_id
 * @property string $type
 * @property string $status
 * @property string $comment
 * @property string $locale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport query()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereUserId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TechSupport\TechSupportAttachment> $attachments
 * @property-read int|null $attachments_count
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereLocale($value)
 * @mixin \Eloquent
 */
class TechSupport extends Model
{
    protected $table = 'tech_support';

    protected $fillable = [
        'email',
        'user_id',
        'type',
        'status',
        'comment',
        'locale',
    ];

    public function attachments(): HasMany
    {
        return $this->hasMany(TechSupportAttachment::class);
    }
}
