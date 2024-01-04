<?php

declare(strict_types=1);

namespace App\Rules\User;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Translation\PotentiallyTranslatedString;

class CustomPhone implements ValidationRule
{
    public $implicit = true;

    /**
     * Добавляем "+" к телефону, чтобы сделать проверку телефона.
     *
     * @param string $attribute
     * @param mixed $value
     * @param \Closure(string): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (is_null($value)) {
            return;
        }

        $plus = '+';
        $value = $plus.ltrim((string)$value, $plus);

        $rules = ['phone' => 'phone'];
        $input = ['phone' => $value];

        if (!Validator::make($input, $rules)->passes()) {
            $fail(__('validation.phone'));
        }
    }
}
