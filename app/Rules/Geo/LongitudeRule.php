<?php

declare(strict_types=1);

namespace App\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LongitudeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $regex = '/^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))(\.(\d{1,8}))?)|180(\.0+)?)$/';
        if (!preg_match($regex, $value)) {
            $fail(__('validation.custom.longitude_fail'));
        }
    }
}
