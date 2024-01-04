<?php

declare(strict_types=1);

namespace App\Http\Requests\FeatureToggle;

use Illuminate\Foundation\Http\FormRequest;

class DeleteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|exists:feature_toggle,name',
        ];
    }
}
