<?php

declare(strict_types=1);

namespace App\Http\Requests\FeatureToggle;

use Illuminate\Foundation\Http\FormRequest;

class UpsertRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'value' => 'required|string',
            'comment' => 'required|string',
        ];
    }
}
