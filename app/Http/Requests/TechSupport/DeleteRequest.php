<?php

declare(strict_types=1);

namespace App\Http\Requests\TechSupport;

use Illuminate\Foundation\Http\FormRequest;

class DeleteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|integer|min:1',
        ];
    }
}
