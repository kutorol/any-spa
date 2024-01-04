<?php

declare(strict_types=1);

namespace App\Http\Requests\TechSupport;

use App\Enums\TechSupport\TechSupportType;
use App\Rules\Common\MaxFileCountRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class SendRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'type' => ['required', new Enum(TechSupportType::class)],
            'comment' => 'required|string|min:6|max:2500',
            // С какого URL делали запрос
            'from_url' => ['nullable', 'string'],
            // максимум 3 вложения
            'attachments' => ['nullable', new MaxFileCountRule(3)],
            // вложения 10mb максимум и только картинки
            'attachments.*' => 'nullable|mimes:jpg,jpeg,png|max:10240',
        ];
    }
}
