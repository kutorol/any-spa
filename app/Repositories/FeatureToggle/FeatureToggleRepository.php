<?php

declare(strict_types=1);

namespace App\Repositories\FeatureToggle;

use App\DTO\FeatureToggle\FeatureToggleDTO;
use App\Models\FeatureToggle\FeatureToggle;
use Illuminate\Support\Collection;

class FeatureToggleRepository
{
    private const CACHE_KEY = '{system}:feature_toggles';
    private const CACHE_TTL = 24 * 60 * 60;

    // Создает или обновляет запись
    public function upsert(FeatureToggleDTO $dto): FeatureToggle
    {
        $res = FeatureToggle::updateOrCreate([
            'name' => $dto->getName(),
        ], [
            'name' => $dto->getName(),
            'value' => $dto->getValue(),
            'comment' => $dto->getComment(),
        ]);

        redisDel([self::CACHE_KEY]);

        return $res;
    }

    // Отдает тогл по названию
    public function findVal(string $toggleName): string
    {
        $toggles = redisGet(self::CACHE_KEY);
        if (!$toggles) {
            $toggles = FeatureToggle::all(['name', 'value'])->pluck('value', 'name')->all();
            redisSetTTL(self::CACHE_KEY, $toggles, self::CACHE_TTL);
        }

        return $toggles[$toggleName] ?? '';
    }

    public function findAll(): Collection
    {
        return FeatureToggle::orderBy('id', 'desc')->get();
    }

    public function delete(string $toggleName): bool
    {
        $res = (bool)FeatureToggle::where('name', $toggleName)->delete();
        $res && redisDel([self::CACHE_KEY]);

        return $res;
    }
}
