<?php

declare(strict_types=1);

namespace App\Http\Requests\User\OAuth;

use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class GoogleOAuthRequest extends FormRequest implements OAuthRequestInterface
{
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email',
            'g-recaptcha-token' => 'required|recaptchav3:,0.5',
            BaseController::LOCALE_PARAM => 'nullable|string|max:20',
            'id' => 'required|max:255',
            'avatar' => 'nullable|string',
            'role' => ['nullable', new Enum(RolesEnum::class)],
        ];
    }
}
