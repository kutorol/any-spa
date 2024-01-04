<?php

declare(strict_types=1);

namespace App\Rules\Common;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TitleRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param string $attribute
     * @param mixed $value
     * @param Closure $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $regex = '/^[\p{L}\p{M}\s.\-\d\_\&\#\@\!\?\+\(\)\[\]\{\}\*\/\\\\]{1,255}$/u';
        if (!is_string($value) || !preg_match($regex, $value)) {
            $fail(__('validation.custom.bad_title'));
        }
    }
}
