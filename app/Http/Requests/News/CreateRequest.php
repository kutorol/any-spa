<?php

declare(strict_types=1);

namespace App\Http\Requests\News;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use App\Rules\Num\MinMaxInteger;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            // вложения 10mb максимум и только картинки
            'image' => 'required|mimes:jpg,jpeg,png|max:10240',
            'short_text' => 'required|string|min:50|max:255',
            'text' => 'required|string|min:100|max:15000',
            'title' => 'required|string|min:5|max:255',
            BaseController::LOCALE_PARAM => ['required', new Enum(Locale::class)],
            'duplicates' => 'nullable|array',
            'duplicates.*' => ['required_if:duplicates,', 'integer', new MinMaxInteger(), 'exists:news,id'],
        ];
    }
}
