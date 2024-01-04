<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ChangeLocaleRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            BaseController::LOCALE_PARAM => ['required', new Enum(Locale::class)],
        ];
    }
}
