<?php

declare(strict_types=1);

namespace App\Rules\Num;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MinMaxInteger implements ValidationRule
{
    public const MAX_INT32 = 2147483647;

    public function __construct(private readonly bool $withZero = false)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $v = (int)$value;
        $minValue = $this->withZero ? -1 : 0;

        if ((!is_int($value) && !ctype_digit($value)) || $v <= $minValue || $v > self::MAX_INT32) {
            $fail(__('validation.custom.integer', [
                'attribute' => $attribute,
            ]));
        }
    }
}
