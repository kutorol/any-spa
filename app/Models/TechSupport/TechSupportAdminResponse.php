<?php

declare(strict_types=1);

namespace App\Models\TechSupport;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\TechSupport\TechSupportAdminResponse.
 *
 * @property int $id
 * @property int $tech_support_id
 * @property int $user_id
 * @property string $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TechSupport\TechSupportAttachment> $attachments
 * @property-read int|null $attachments_count
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse query()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereTechSupportId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAdminResponse whereUserId($value)
 * @mixin \Eloquent
 */
class TechSupportAdminResponse extends Model
{
    protected $table = 'tech_support_admin_response';

    protected $fillable = [
        'tech_support_id',
        'user_id',
        'comment',
    ];

    public function attachments(): HasMany
    {
        return $this->hasMany(TechSupportAttachment::class);
    }
}
