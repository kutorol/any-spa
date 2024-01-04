<?php

declare(strict_types=1);

namespace App\Http\Requests\I18n;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'val' => 'required|string',
            'label' => 'required|string',
            BaseController::LOCALE_PARAM => ['required', new Enum(Locale::class)],
        ];
    }
}
