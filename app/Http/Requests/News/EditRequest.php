<?php

declare(strict_types=1);

namespace App\Http\Requests\News;

use App\Rules\Num\MinMaxInteger;
use Illuminate\Foundation\Http\FormRequest;

class EditRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', new MinMaxInteger(), 'exists:news,id'],
            // вложения 10mb максимум и только картинки
            'image' => 'nullable|mimes:jpg,jpeg,png|max:10240',
            'short_text' => 'nullable|string|min:50|max:255',
            'text' => 'nullable|string|min:100|max:15000',
            'title' => 'nullable|string|min:5|max:255',
            'duplicates' => 'nullable|array',
            'duplicates.*' => ['required_if:duplicates,', 'integer', new MinMaxInteger(), 'exists:news,id'],
        ];
    }
}
