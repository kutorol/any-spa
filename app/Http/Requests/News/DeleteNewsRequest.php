<?php

declare(strict_types=1);

namespace App\Http\Requests\News;

use App\Rules\Num\MinMaxInteger;
use Illuminate\Foundation\Http\FormRequest;

class DeleteNewsRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => ['required', new MinMaxInteger(), 'exists:news,id'],
        ];
    }
}
