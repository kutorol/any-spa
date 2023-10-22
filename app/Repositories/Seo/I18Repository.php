<?php

declare(strict_types=1);

namespace App\Repositories\Seo;

use App\Enums\Common\Locale;
use App\Models\Seo\I18Seo;

class I18Repository
{
    private const REDIS_TTL = 10 * 60;

    public function findByLabel(string $label, Locale $locale): ?string
    {
        $label = $this->prepareLabel($label);
        if (!$label) {
            return null;
        }

        $value = I18Seo::select(['value'])->where('label', $label)->where('locale', $locale->value)->first();
        if (!$value) {
            (new I18Seo())->insert([
                'label' => $label,
                'value' => '',
                'locale' => $locale,
            ]);

            return null;
        }

        return trim($value->value) ?: null;
    }

    public function seoFindByLabel(string $label, Locale $locale): array
    {
        $res = [
            'title' => __('no_exists_such_page_seo'),
            'desc' => __('no_exists_such_page_seo'),
            'h1' => __('no_exists_such_page_seo'),
        ];

        $label = $this->prepareLabel($label);
        if (!$label) {
            return $res;
        }

        $cacheKey = "seo:{$label}";
        /** @var array|null $cachedRes */
        $cachedRes = redisGet($cacheKey);
        if ($cachedRes) {
            return $cachedRes;
        }

        $keys = ["seo_title_{$label}", "seo_desc_{$label}", "seo_h1_{$label}"];
        foreach ($keys as $i => $k) {
            $keys[$i] = $this->prepareLabel($k);
        }

        try {
            $value = I18Seo::select(['value', 'label'])
                ->whereIn('label', $keys)
                ->where('locale', $locale->value)
                ->get()
                ->pluck('value', 'label')
                ->all();

            $willInsert = [];
            foreach ($keys as $key) {
                if (isset($value[$key])) {
                    $k = explode('_', $key)[1];
                    $res[$k] = trim($value[$key]) ?: $res[$k];
                } else {
                    $willInsert[$key] = true;
                }
            }

            foreach ($willInsert as $item => $v) {
                (new I18Seo())->insert([
                    'label' => $item,
                    'value' => '',
                    'locale' => $locale,
                ]);
            }

            redisSetTTL($cacheKey, $res, self::REDIS_TTL);
        } catch (\Throwable $e) {
            \Log::error('rep seoFindByLabel has err', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);
        }

        return $res;
    }

    private function prepareLabel(string $label): string
    {
        return trim(preg_replace("/\_\_+/", '_', preg_replace('/[^a-z0-9_]/iu', '_', $label)));
    }
}
