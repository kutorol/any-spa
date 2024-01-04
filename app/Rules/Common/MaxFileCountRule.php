<?php

declare(strict_types=1);

namespace App\Rules\Common;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Правило на максимальное загруженное кол-во файлов.
 */
class MaxFileCountRule implements ValidationRule
{
    public function __construct(private readonly int $maxCount)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (count($value ?? []) > $this->maxCount) {
            $fail(__('validation.custom.max_file_count', ['num' => $this->maxCount]));
        }
    }
}
