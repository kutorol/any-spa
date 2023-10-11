<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgotRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users',
            'g-recaptcha-token' => 'required|recaptchav3:,0.5',
        ];
    }
}
