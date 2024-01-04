<?php

declare(strict_types=1);

namespace App\Repositories\Seo;

use App\Enums\Common\Locale;
use App\Exceptions\Entity\CustomValidationException;
use App\Http\Controllers\Api\BaseController;
use App\Models\Seo\I18nSeo;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Log;
use Throwable;

class I18nRepository
{
    // постраничный вывод в админке
    private const PER_PAGE = 50;
    // сколько хранить в кэше
    private const REDIS_TTL = 10 * 60;

    /**
     * Обновляет или создает новую запись перевода.
     * @param string $label
     * @param Locale $locale
     * @param string $val
     * @return I18nSeo
     * @throws CustomValidationException
     */
    public function upsert(string $label, Locale $locale, string $val): I18nSeo
    {
        $label = $this->prepareLabel($label);
        if (!$label) {
            throw new CustomValidationException(__('i18n.bad_label'));
        }

        $res = I18nSeo::updateOrCreate([
            'label' => $label,
            BaseController::LOCALE_PARAM => $locale,
        ], ['value' => $val]);

        $l = preg_replace('/^seo_(h1|title|desc)_/', '', $label);
        $cacheKey = $this->getCacheKey($locale, $l);
        redisDel([$cacheKey]);

        return $res;
    }

    public function getDefaultSeoTitles(): array
    {
        return [
            'title' => __('seo.no_exists_such_page_seo'),
            'desc' => __('seo.no_exists_such_page_seo'),
            'h1' => __('seo.no_exists_such_page_seo'),
        ];
    }

    /**
     * Получает или сохраняет новые переводы в админку.
     * @param string $label
     * @param Locale $locale
     * @return array
     */
    public function seoFindByLabel(string $label, Locale $locale): array
    {
        $res = $this->getDefaultSeoTitles();

        $label = $this->prepareLabel($label);
        if (!$label) {
            $label = 'main_page';
        }

        $cacheKey = $this->getCacheKey($locale, $label);

        /** @var array|null $cachedRes */
        $cachedRes = redisGet($cacheKey);
        if ($cachedRes) {
            return $cachedRes;
        }

        // Добавление есть только из запроса к api
        if (BaseController::isWeb()) {
            return $res;
        }

        $keys = ["seo_desc_{$label}", "seo_h1_{$label}", "seo_title_{$label}"];
        foreach ($keys as $i => $k) {
            $keys[$i] = $this->prepareLabel($k);
        }

        try {
            $locales = $locale === Locale::RU ? [$locale] : [Locale::RU, $locale];

            $value = I18nSeo::select(['value', 'label', 'locale'])
                ->whereIn('label', $keys)
                ->whereIn(BaseController::LOCALE_PARAM, $locales)
                ->get();

            $willInsert = [];
            $exists = [];
            /** @var I18nSeo $item */
            foreach ($value as $item) {
                $k = $item->locale->value.'__'.$item->label;
                $exists[$k] = $item->value;
            }

            /** @var Locale $l */
            foreach ($locales as $l) {
                foreach ($keys as $key) {
                    $k = $l->value.'__'.$key;
                    if (isset($exists[$k])) {
                        $k2 = explode('_', $key)[1];
                        // Добавляем только тут, т.к. по дефолту уже данные были внесены выше
                        if ($locale === $l) {
                            $res[$k2] = trim($exists[$k]) ?: $res[$k2];
                        }
                    } else {
                        $willInsert[$k] = $key;
                    }
                }
            }

            DB::transaction(function () use ($willInsert, $locales, $keys) {
                $now = now();

                foreach ($locales as $l) {
                    foreach ($keys as $key) {
                        $k = $l->value.'__'.$key;
                        if (!isset($willInsert[$k])) {
                            continue;
                        }

                        I18nSeo::create([
                            'label' => $willInsert[$k],
                            'value' => '',
                            BaseController::LOCALE_PARAM => $l,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ]);
                    }
                }
            });

            redisSetTTL($cacheKey, $res, self::REDIS_TTL);
        } catch (Throwable $e) {
            Log::error('rep seoFindByLabel has err', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);
        }

        return $res;
    }

    /**
     * Находит локализации на русском языке и после получает все локализации на других языках.
     * @param int $page
     * @return LengthAwarePaginator
     * @throws Throwable
     */
    public function findRecursion(int $page): LengthAwarePaginator
    {
        $page = $page < 1 ? 0 : $page;
        $offset = ($page - 1) * self::PER_PAGE;

        // Получаем переводы с RU языком и постраничной навигацией, а дальше забираем переводы
        // для полученных записей на другом языке
        $sql = 'WITH RECURSIVE r AS (
                    (
                        SELECT COUNT(*) OVER () AS total, id, label, value, locale, updated_at
                        FROM i18n
                        WHERE locale = ?
                        ORDER BY id DESC
                        LIMIT ? OFFSET ?
                    ) UNION (
                        SELECT 0 AS total, i18n.id, i18n.label, i18n.value, i18n.locale, i18n.updated_at
                        FROM i18n
                        INNER JOIN r ON i18n.locale != ? AND i18n.label = r.label
                        ORDER BY i18n.id DESC
                    )
                )
                SELECT total, id, label, value, locale, updated_at
                FROM r';

        $result = DB::select(
            $sql,
            [
                Locale::RU->value,
                self::PER_PAGE,
                $offset,
                Locale::RU->value,
            ]
        );

        $total = (int)($result[0]->total ?? 0);
        $response = [];
        foreach ($result as $res) {
            if ((int)$res->total === 0) {
                continue;
            }

            $res->other_langs = [];
            $response[$res->label] = $res;
        }

        foreach ($result as $res) {
            if ((int)$res->total > 0 || !isset($response[$res->label])) {
                continue;
            }

            $response[$res->label]->other_langs[] = $res;
        }

        return new LengthAwarePaginator(array_values($response), $total, self::PER_PAGE, $page);
    }

    private function prepareLabel(string $label): string
    {
        $l = explode('/', $label);
        $parts = [];
        foreach ($l as $part) {
            $p = trim($part);
            if ($p === '' || Locale::tryFrom($p)) {
                continue;
            }

            $parts[] = $p;
        }

        return trim(preg_replace("/\_\_+/", '_', preg_replace('/[^a-z0-9_]/iu', '_', implode('_', $parts))));
    }

    /**
     * Возвращает ключ для кэша.
     * @param Locale $locale
     * @param string $label
     * @return string
     */
    private function getCacheKey(Locale $locale, string $label): string
    {
        return "{seo_{$locale->value}}:{$label}";
    }
}
