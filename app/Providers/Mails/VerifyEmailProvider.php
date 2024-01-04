<?php

declare(strict_types=1);

namespace App\Providers\Mails;

use App\Providers\InterfaceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailProvider implements InterfaceProvider
{
    public function handle(): void
    {
        // переопределяем какое письмо будет отправляться для подтверждения email
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage())
                ->subject(__('auth.email.subject_mail', ['site_name' => getPrettySiteName()]))
                ->line(__('auth.email.click_btn_to_verify'))
                ->action(__('auth.email.verify_btn'), $url)
                ->greeting(__('auth.email.hello'))
                ->level('success')
                ->salutation(__('auth.email.salutation'));
        });
    }
}
