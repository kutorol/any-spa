<?php

declare(strict_types=1);

namespace App\Models\TechSupport;

use App\Enums\Common\Locale;
use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;
use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * App\Models\TechSupport\TechSupport.
 *
 * @property int $id
 * @property string $email
 * @property int|null $user_id
 * @property TechSupportType $type
 * @property TechSupportStatus $status
 * @property string $comment
 * @property Locale $locale
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
 * @property string|null $from_url
 * @property string|null $user_agent
 * @property string|null $ip
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereFromUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupport whereUserAgent($value)
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
        BaseController::LOCALE_PARAM,
        'from_url',
        'user_agent',
        'ip',
    ];

    protected $casts = [
        'type' => TechSupportType::class,
        BaseController::LOCALE_PARAM => Locale::class,
        'status' => TechSupportStatus::class,
    ];

    public function attachments(): HasMany
    {
        return $this->hasMany(TechSupportAttachment::class);
    }

    public function comments(): Collection
    {
        return $this->hasMany(TechSupportAdminResponse::class)
            ->join('users', 'tech_support_admin_response.user_id', '=', 'users.id')
            ->select([
                'tech_support_admin_response.user_id',
                'tech_support_admin_response.comment',
                'tech_support_admin_response.created_at',
                'tech_support_admin_response.status',
                'users.avatar',
                'users.name',
            ])
            ->orderBy('tech_support_admin_response.created_at', 'ASC')
            ->get();
    }
}
