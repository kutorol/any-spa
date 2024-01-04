<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\I18n;

use App\Enums\Common\Locale;
use App\Exceptions\Entity\CustomValidationException;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\I18n\UpdateRequest;
use App\Repositories\Seo\I18nRepository;
use Illuminate\Http\JsonResponse;
use Throwable;

class AdminI18nController extends BaseController
{
    /**
     * Показ всех переводов из бд.
     * @param I18nRepository $rep
     * @return JsonResponse
     * @throws Throwable
     */
    public function index(I18nRepository $rep): JsonResponse
    {
        $res = $rep->findRecursion(getPage());

        return $this->successResponse('', preparePaginationResponse('i18n_list', $res));
    }

    /**
     * Создание/обновление перевода в бд.
     * @param UpdateRequest $request
     * @param I18nRepository $rep
     * @return JsonResponse
     * @throws CustomValidationException
     */
    public function upsert(UpdateRequest $request, I18nRepository $rep): JsonResponse
    {
        $data = $request->validated();
        $i18n = $rep->upsert($data['label'], Locale::from($data[self::LOCALE_PARAM]), $data['val']);

        return $i18n->id
            ? $this->successResponse(__('i18n.admin.update_success'))
            : $this->badRequestResponse(failMsg());
    }
}
