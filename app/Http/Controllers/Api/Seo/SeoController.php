<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Seo;

use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use App\Repositories\Seo\I18Repository;
use Illuminate\Http\JsonResponse;

class SeoController extends BaseController
{
    public function pageInfo(): JsonResponse
    {
        $repository = app(I18Repository::class);
        $path = trim(urldecode(request()->get('path', '')));
        if (!$path) {
            $path = request()->path();
        }

        $path = ltrim($path, '/');

        $locale = Locale::tryFrom(\App::getLocale()) ?? Locale::RU;

        return $this->successResponse('', [
            'seo' => $repository->seoFindByLabel($path, $locale),
        ]);
    }
}
