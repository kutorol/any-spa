<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ChangeAvatarRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'attachment' => 'required|mimes:jpg,jpeg,png|max:10240',
        ];
    }
}
