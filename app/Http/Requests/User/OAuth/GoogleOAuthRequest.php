<?php

declare(strict_types=1);

namespace App\Http\Requests\User\OAuth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class GoogleOAuthRequest extends FormRequest implements OAuthRequestInterface
{
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email',
            'g-recaptcha-token' => 'required|recaptchav3:,0.5',
            'role' => 'nullable|in:'.implode(',', User::roles()),
            'locale' => 'nullable|string|max:20',
            'id' => 'required|max:255',
            'avatar' => 'nullable|string',
        ];
    }
}
