<?php

declare(strict_types=1);

namespace App\Providers\Mails;

use App\Models\User;
use App\Providers\InterfaceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordProvider implements InterfaceProvider
{
    public function handle(): void
    {
        // переопределяем какое письмо будет отправляться для подтверждения email
        ResetPassword::toMailUsing(function (User $user, string $token) {
            return (new MailMessage())
                ->subject(__('auth.pass.subject_mail', ['site_name' => config('app.url')]))
                ->line(__('auth.pass.click_btn_to_change_pass'))
                ->action(__('auth.pass.action_btn'), route('pass.forgot_show_form_with_pass', [
                    'token' => $token,
                    'email' => $user->email,
                ]))
                ->greeting(__('auth.email.hello'))
                ->level('success')
                ->salutation(__('auth.pass.salutation'));
        });
    }
}
