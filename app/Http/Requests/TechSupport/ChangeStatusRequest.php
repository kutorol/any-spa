<?php

declare(strict_types=1);

namespace App\Http\Requests\TechSupport;

use App\Enums\TechSupport\TechSupportStatus;
use Illuminate\Foundation\Http\FormRequest;

class ChangeStatusRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|integer|min:1',
            'status' => 'required|string|in:'.implode(',', TechSupportStatus::allValues()),
            'comment' => 'nullable|string|min:6|max:2500',
        ];
    }
}
