<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCurrentPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'password' => 'required|confirmed|min:6|max:255',
        ];
    }
}
