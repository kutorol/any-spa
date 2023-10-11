<?php

declare(strict_types=1);

namespace App\Http\Requests\User\Email;

use Illuminate\Foundation\Http\FormRequest;

class VerifyEmailRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|integer|min:1',
        ];
    }

    // Докидывает данные для проверки
    protected function prepareForValidation()
    {
        // докидываем id из роута
        $this->merge(['id' => $this->route('id')]);
    }
}
