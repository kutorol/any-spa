<?php

declare(strict_types=1);

namespace App\Http\Requests\TechSupport;

use App\Enums\TechSupport\TechSupportStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ChangeStatusRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|integer|min:1',
            'status' => ['required', new Enum(TechSupportStatus::class)],
            'comment' => 'nullable|string|max:2500',
        ];
    }
}
