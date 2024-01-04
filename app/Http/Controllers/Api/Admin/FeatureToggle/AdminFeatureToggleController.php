<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\FeatureToggle;

use App\DTO\FeatureToggle\FeatureToggleDTO;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\FeatureToggle\DeleteRequest;
use App\Http\Requests\FeatureToggle\UpsertRequest;
use App\Repositories\FeatureToggle\FeatureToggleRepository;
use Illuminate\Http\JsonResponse;

// Класс по работе с фичетоглами
class AdminFeatureToggleController extends BaseController
{
    /**
     * Возвращает все тоглы.
     * @param FeatureToggleRepository $rep
     * @return JsonResponse
     */
    public function index(FeatureToggleRepository $rep): JsonResponse
    {
        return $this->successResponse('', [
            'toggles' => $rep->findAll(),
        ]);
    }

    /**
     * Обновляет или создает тогл.
     * @param UpsertRequest $request
     * @param FeatureToggleRepository $rep
     * @return JsonResponse
     */
    public function upsert(UpsertRequest $request, FeatureToggleRepository $rep): JsonResponse
    {
        $data = $request->validated();
        $dto = (new FeatureToggleDTO())
            ->setName($data['name'])
            ->setValue($data['value'])
            ->setComment($data['comment']);

        $entity = $rep->upsert($dto);
        if (!$entity->id) {
            return $this->internalResponse(__('toggle.upsert.fail'));
        }

        return $this->successResponse(__('toggle.upsert.success'));
    }

    /**
     * Создает новый тогл.
     * @param UpsertRequest $request
     * @param FeatureToggleRepository $rep
     * @return JsonResponse
     */
    public function create(UpsertRequest $request, FeatureToggleRepository $rep): JsonResponse
    {
        $res = $this->upsert($request, $rep);

        if ($res->getData()->status) {
            return $this->successResponse(__('toggle.create.success'));
        }

        return $this->internalResponse(__('toggle.create.fail'));
    }

    /**
     * Удаляет тогл.
     * @param DeleteRequest $request
     * @param FeatureToggleRepository $rep
     * @return JsonResponse
     */
    public function delete(DeleteRequest $request, FeatureToggleRepository $rep): JsonResponse
    {
        $toggleName = $request->get('name');

        if ($rep->delete($toggleName)) {
            return $this->successResponse(__('toggle.delete.success'));
        }

        return $this->internalResponse(__('toggle.delete.fail'));
    }
}
