<?php

declare(strict_types=1);

namespace App\Events\TechSupport;

use App\Models\TechSupport\TechSupport;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TechSupportUpdate
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public TechSupport $entity;

    public ?string $adminComment;

    /**
     * Create a new event instance.
     */
    public function __construct(TechSupport $entity, ?string $adminComment = null)
    {
        $this->entity = $entity;
        $this->adminComment = $adminComment;
    }
}
