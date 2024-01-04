<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\User;

use App\Models\User;
use App\Models\User\ABTestUser;
use App\Repositories\AB\ABTestRepository;
use Throwable;

class AbTestUserController
{
    /**
     * Возвращает а/б тесты юзера и дополняет их, если появились новые тесты.
     * @param User|null $user
     * @return array
     * @throws Throwable
     */
    public static function getABTests(?User $user = null): array
    {
        // это бот?
        if (isCrawler()) {
            return [];
        }

        $abRep = app(ABTestRepository::class);
        $tests = $abRep->findFromCache();

        $userABTests = getUserABTests();

        $userTests = [];
        if ($user) {
            $abTests = $user->abTests;
            /** @var ABTestUser $testValue */
            foreach ($abTests as $testValue) {
                unset($tests[$testValue->ab_test_id]);

                $userTests[$testValue->ab_test_id] = $testValue->ab_test_values_id;
            }
        } else {
            foreach ($userABTests as $testID => $testValueID) {
                unset($tests[$testID]);

                $userTests[$testID] = $testValueID;
            }
        }

        return $userTests + $abRep->getTestValueIDs($user->id ?? 0, array_keys($tests));
    }
}
