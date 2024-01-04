<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\ABTest;

use App\DTO\AB\ABTestDTO;
use App\DTO\AB\ABTestValueDTO;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\ABTest\DeleteRequest;
use App\Http\Requests\ABTest\UpsertRequest;
use App\Repositories\AB\ABTestRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Throwable;

class AdminAbTestController extends BaseController
{
    /**
     * Возвращает все а/б тесты.
     * @param ABTestRepository $rep
     * @return JsonResponse
     */
    public function index(ABTestRepository $rep): JsonResponse
    {
        return $this->successResponse('', [
            'total_users' => app(UserRepository::class)->getTotalUsers(),
            'list_ab_tests' => $rep->findAll(),
        ]);
    }

    /**
     * Возвращает всю инфу по а/б тесту.
     * @param int $id
     * @param ABTestRepository $rep
     * @return JsonResponse
     */
    public function info(int $id, ABTestRepository $rep): JsonResponse
    {
        $key = 'id';
        if (!validateIntForDB($key, $id)) {
            return $this->validationResponse(__('validation.custom.integer', ['attribute' => $key]));
        }

        return $this->successResponse('', [
            'ab_test' => $rep->info($id),
        ]);
    }

    /**
     * Обновляет или создает а/б тест.
     * @param UpsertRequest $request
     * @param ABTestRepository $rep
     * @return JsonResponse
     * @throws Throwable
     */
    public function upsert(UpsertRequest $request, ABTestRepository $rep): JsonResponse
    {
        $data = $request->validated();

        $values = [];
        foreach ($data['values'] as $item) {
            $values[] = (new ABTestValueDTO())
                            ->setID((int) ($item['id'] ?? 0))
                            ->setValue(trim($item['value']));
        }

        if (empty($values)) {
            return $this->validationResponse(__('ab.upsert.no_values'));
        }

        $dto = (new ABTestDTO())
            ->setNameTest(trim($data['nameTest']))
            ->setIsActive((int)$data['isActive'] === 1)
            ->setID((int)($data['id'] ?? 0))
            ->setComment(trim($data['comment']))
            ->setTotalPercentFromUsers((int)$data['totalPercentFromUsers'])
            ->setMaxCountUsersInTest((int)$data['maxCountUsersInTest'])
            ->setValues($values);

        $testID = $rep->upsertTest($dto);
        if (!$testID) {
            return $this->internalResponse(__('ab.upsert.fail'));
        }

        return $this->successResponse(__('ab.upsert.success'), [
            'test_id' => $testID,
        ]);
    }

    /**
     * Создает новый тогл.
     * @param UpsertRequest $request
     * @param ABTestRepository $rep
     * @return JsonResponse
     * @throws Throwable
     */
    public function create(UpsertRequest $request, ABTestRepository $rep): JsonResponse
    {
        $res = $this->upsert($request, $rep);

        if ($res->getData()->status) {
            return $this->successResponse(__('ab.create.success'));
        }

        return $this->internalResponse(__('ab.create.fail'));
    }

    /**
     * Удаляет тогл.
     * @param DeleteRequest $request
     * @param ABTestRepository $rep
     * @return JsonResponse
     */
    public function delete(DeleteRequest $request, ABTestRepository $rep): JsonResponse
    {
        $testID = (int)$request->get('id');

        if ($rep->delete($testID)) {
            return $this->successResponse(__('ab.delete.success'));
        }

        return $this->internalResponse(__('ab.delete.fail'));
    }
}
