<?php

declare(strict_types=1);

namespace App\Repositories\AB;

use App\DTO\AB\ABTestDTO;
use App\DTO\AB\ABTestValueDTO;
use App\Models\AB\ABTest;
use App\Models\AB\ABTestValue;
use App\Models\User\ABTestUser;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Throwable;

class ABTestRepository
{
    private const CACHE_KEY = '{system}:ab_tests';
    private const CACHE_TTL = 24 * 60 * 60;
    private const DEFAULT_TEST_VALUE = 0;

    /**
     * Создает или обновляет тест и возвращает id теста.
     * @param ABTestDTO $dto
     * @return int
     * @throws Throwable
     */
    public function upsertTest(ABTestDTO $dto): int
    {
        return (int)DB::transaction(function () use ($dto) {
            $test = ABTest::updateOrCreate([
                'id' => $dto->getID(),
            ], [
                'key' => $dto->getNameTest(),
                'total_percent_from_users' => $dto->getTotalPercentFromUsers(),
                'max_count_users_in_test' => $dto->getMaxCountUsersInTest(),
                'active' => $dto->getIsActive(),
                'comment' => $dto->getComment(),
            ]);

            $valIDs = array_filter(array_map(fn (ABTestValueDTO $val) => $val->getID(), $dto->getValues()));
            // удаляем те значения, которые не пришли
            $q = ABTestValue::where('ab_test_id', $test->id);
            // если старые значения остались, то удаляем все, кроме них
            if (!empty($valIDs)) {
                $q->whereNotIn('id', $valIDs);
            }
            $q->delete();

            foreach ($dto->getValues() as $value) {
                ABTestValue::updateOrCreate([
                    // id может быть == 0, если это новое значение
                    'id' => $value->getID(),
                    'ab_test_id' => $test->id,
                ], [
                    'ab_test_id' => $test->id,
                    'value' => $value->getValue(),
                ]);
            }

            return $test->id;
        });
    }

    /**
     * Находит все a/b тесты.
     * @return Collection
     */
    public function findAll(): Collection
    {
        return ABTest::select([
            'id',
            'key',
            'total_percent_from_users',
            'total_users_in_test',
            'max_count_users_in_test',
            'active',
            'comment',
            'created_at',
            'updated_at',
        ])
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Возвращает конкретную инфу по одному тесту.
     * @param int $id
     * @return Model|Builder|ABTest|null
     */
    public function info(int $id): Model|Builder|ABTest|null
    {
        $test = ABTest::select([
            'id',
            'key',
            'total_percent_from_users',
            'total_users_in_test',
            'max_count_users_in_test',
            'active',
            'comment',
            'created_at',
            'updated_at',
        ])
            ->where('id', $id)
            ->first();

        $test->test_values = $test->values;
        unset($test->values);

        return $test;
    }

    /**
     * Удаляет тест
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $res = (bool)ABTest::where('id', $id)->delete();
        redisDel([self::CACHE_KEY]);

        return $res;
    }

    /**
     * Получает минимальный набор данных для теста.
     * @return array<int,int[]>
     */
    public function findFromCache(): array
    {
        $cacheTests = redisGet(self::CACHE_KEY);
        if ($cacheTests) {
            return $cacheTests;
        }

        $tests = ABTest::with('values')->select(['id'])
            ->whereRaw('total_users_in_test < max_count_users_in_test')
            ->where('active', true)
            ->get();

        $cacheTests = [];
        /** @var ABTest $test */
        foreach ($tests as $test) {
            $cacheTests[$test->id] = [];

            /** @var ABTestValue $value */
            foreach ($test->values as $value) {
                $cacheTests[$test->id][] = $value->id;
            }
        }

        redisSetTTL(self::CACHE_KEY, $cacheTests, self::CACHE_TTL);

        return $cacheTests;
    }

    /**
     * @param int $userID - 0 - это аноним
     * @param array<int> $testIDs
     * @param int $partGroup - нужна ли определенная часть теста (не все значения, а только часть)
     * @return array<int,int> - [testID => valueID]
     * @throws Throwable
     */
    public function getTestValueIDs(int $userID, array $testIDs, int $partGroup = 0): array
    {
        $resp = [];
        $tests = $this->findFromCache();
        $needRequestTestD = [];
        foreach ($testIDs as $testID) {
            // дефолтное значение
            if (!isset($tests[$testID])) {
                $resp[$testID] = self::DEFAULT_TEST_VALUE;
                continue;
            }

            $needRequestTestD[] = $testID;
        }

        if (empty($needRequestTestD)) {
            return $resp;
        }

        $respTx = DB::transaction(function () use ($tests, $userID, $needRequestTestD, $partGroup) {
            $placeholders = implode(',', array_fill(0, count($needRequestTestD), '?'));
            $sql = "UPDATE ab_test_group
                    SET total_users_in_test = total_users_in_test + 1
                    WHERE id IN ({$placeholders})
                    RETURNING id, total_users_in_test";
            $totalUserInTests = DB::select($sql, $needRequestTestD);
            $testsTotalUsers = [];
            foreach ($totalUserInTests as $test) {
                $testsTotalUsers[$test->id] = (int)$test->total_users_in_test;
            }

            $respTx = [];
            foreach ($testsTotalUsers as $testID => $totalUserInTest) {
                if ($partGroup == 0) {
                    $num = $totalUserInTest % count($tests[$testID]);
                } else {
                    $num = min($totalUserInTest % $partGroup, count($tests[$testID]) - 1);
                }

                $testValueID = (int)$tests[$testID][$num];
                $respTx[$testID] = $testValueID;

                ABTestValue::where('id', $testValueID)
                    ->update([
                        'total_user_with_value' => DB::raw('total_user_with_value + 1'),
                    ]);

                if ($userID) {
                    ABTestUser::updateOrCreate([
                        'user_id' => $userID,
                        'ab_test_id' => $testID,
                    ], ['ab_test_values_id' => $testValueID]);
                }
            }

            return $respTx;
        });

        redisDel([self::CACHE_KEY]);

        return $resp + $respTx;
    }
}
