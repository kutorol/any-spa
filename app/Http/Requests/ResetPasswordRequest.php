<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules()
    {
        return [
            'url_token' => 'required',
            'email' => 'required|email|exists:users',
            'password' => 'required|confirmed|min:6',
        ];
    }

    // Докидывает данные для проверки
    protected function prepareForValidation()
    {
        // докидываем token из роута
        $this->merge(['token' => $this->route('token')]);
    }
}
