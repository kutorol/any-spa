<?php

declare(strict_types=1);

namespace App\Listeners\TechSupport;

use App\Events\TechSupport\TechSupportUpdate;
use App\Mail\TechSupport\TechSupportUpdate as TechSupportUpdateMail;
use Mail;

class TechSupportUpdateNotification
{
    /**
     * Handle the event.
     */
    public function handle(TechSupportUpdate $event): void
    {
        Mail::to($event->entity->email)
            ->locale($event->entity->locale->value)
            ->send(new TechSupportUpdateMail($event->entity, $event->adminComment));
    }
}
