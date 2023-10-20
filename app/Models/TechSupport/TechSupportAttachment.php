<?php

declare(strict_types=1);

namespace App\Models\TechSupport;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TechSupport\TechSupportAttachment.
 *
 * @property int $id
 * @property int $tech_support_id
 * @property string $file_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment query()
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment whereTechSupportId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TechSupportAttachment whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TechSupportAttachment extends Model
{
    protected $table = 'tech_support_attachment';

    protected $fillable = [
        'tech_support_id',
        'file_name',
    ];
}
