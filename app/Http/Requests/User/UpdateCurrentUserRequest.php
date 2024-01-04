<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Enums\User\SexEnum;
use App\Rules\User\CustomPhone;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateCurrentUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:1|max:255',
            'email' => 'required|email',
            'phone' => ['nullable', 'integer', 'min:1', new CustomPhone],
            'is_am_pm' => 'required|boolean',
            'sex' => ['required', new Enum(SexEnum::class)],
            'birthday' => 'nullable|date_format:Y-m-d|after_or_equal:'.config('date.min_date').'|before_or_equal:'.now()->format('Y-m-d'),
            'gmt' => 'required|integer|min:-11|max:14',
            'city' => 'required|string|min:1|max:255',
        ];
    }
}
