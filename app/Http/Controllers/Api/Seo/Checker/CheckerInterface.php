<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Seo\Checker;

interface CheckerInterface
{
    public function check(array $parts): bool;
}
