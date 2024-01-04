<?php

declare(strict_types=1);

namespace App\Http\Requests\News;

use App\Rules\Num\MinMaxInteger;
use Illuminate\Foundation\Http\FormRequest;

class ClearUnUsedImagesRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', new MinMaxInteger(true)],
        ];
    }
}
