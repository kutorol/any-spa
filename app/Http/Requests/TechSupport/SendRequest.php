<?php

declare(strict_types=1);

namespace App\Http\Requests\TechSupport;

use App\Enums\TechSupport\TechSupportType;
use Illuminate\Foundation\Http\FormRequest;

class SendRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'type' => 'required|string|in:'.implode(',', TechSupportType::allValues()),
            'comment' => 'required|string|min:6|max:2500',
            // максимум 3 вложения
            'attachments' => [
                'nullable',
                function ($attr, $v, $fail) {
                    $maxFileCount = 3;
                    if (count($v ?? []) > $maxFileCount) {
                        return $fail(__('validation.max_file_count', ['num' =>$maxFileCount]));
                    }
                },
            ],
            // вложения 10mb максимум и только картинки
            'attachments.*' => 'nullable|mimes:jpg,jpeg,png|max:10240',
        ];
    }
}
