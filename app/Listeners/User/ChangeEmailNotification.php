<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Events\User\ChangeEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class ChangeEmailNotification
{
    /**
     * Handle the event.
     */
    public function handle(ChangeEmail $event): void
    {
        // переопределяем какое письмо будет отправляться для подтверждения email
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage())
                ->subject(__('auth.email.subject_mail', ['site_name' => getPrettySiteName()]))
                ->line(__('auth.email.click_btn_to_verify'))
                ->action(__('auth.email.verify_btn'), $url)
                ->greeting(__('auth.email.hello'))
                ->level('success')
                ->salutation(__('auth.email.salutation_change_email'));
        });

        $event->user->sendEmailVerificationNotification();
    }
}
