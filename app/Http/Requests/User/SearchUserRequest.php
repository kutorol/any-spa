<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SearchUserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids' => 'nullable|array',
            'name' => 'nullable|string',
            'email' => 'nullable|string',
            'roles' => 'nullable|array',
            'withDeleted' => 'nullable|bool',
        ];
    }
}
