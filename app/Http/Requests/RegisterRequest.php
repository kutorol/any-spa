<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\User\RolesEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|max:255',
            'password_confirmation' => 'required|same:password|min:6|max:255',
            'g-recaptcha-token' => 'required|recaptchav3:,0.5',
            'role' => ['required', new Enum(RolesEnum::class)],
        ];
    }
}
