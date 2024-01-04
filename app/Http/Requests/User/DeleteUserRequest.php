<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class DeleteUserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|integer|min:1',
        ];
    }
}
