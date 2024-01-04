<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Seo\Checker;

/**
 * Класс, проверяющий, что это путь для инфо новости /news/:id.
 */
class CheckerNewsInfo implements CheckerInterface
{
    public function check(array $parts): bool
    {
        $part1 = mb_strtolower($parts[0] ?? '');
        $part2 = (int)($parts[1] ?? -1);

        return $part1 === 'news' && $part2 >= 0;
    }
}
