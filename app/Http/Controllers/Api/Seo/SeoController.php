<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Seo;

use App;
use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\Seo\Checker\CheckerInterface;
use App\Http\Controllers\Api\Seo\Checker\CheckerNewsInfo;
use App\Repositories\Seo\I18nRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class SeoController extends BaseController
{
    public const SEO_PARAM = 'seo';

    /** @var array<string|CheckerInterface> CHECKER_EXCLUDE_CLASSES - содержит классы для исключения получения seo текстов */
    private const CHECKER_EXCLUDE_CLASSES = [
        CheckerNewsInfo::class,
    ];

    /**
     * Отдает seo переводы текущей страницы.
     * @return JsonResponse
     */
    public function pageInfo(): JsonResponse
    {
        $path = $this->getPath();

        if ($this->isAdmin($path)) {
            $adminText = __('seo.admin.page_title');

            return $this->successResponse('', [
                self::SEO_PARAM => [
                    'title' => $adminText,
                    'desc' => $adminText,
                    'h1' => $adminText,
                ],
            ]);
        }

        $locale = Locale::tryFrom(App::getLocale());
        $rep = app(I18nRepository::class);
        if ($this->isExcluded($path)) {
            return $this->successResponse('', [self::SEO_PARAM => $rep->getDefaultSeoTitles()]);
        }

        return $this->successResponse('', [
            self::SEO_PARAM => $rep->seoFindByLabel($path, $locale),
        ]);
    }

    private function isAdmin(string $path): bool
    {
        $parts = explode('/', $path);

        return mb_strtolower($parts[1] ?? '') === 'admin';
    }

    /**
     * Проверяем на адреса, которые исключены из получения seo данных.
     * @param string $path
     * @return bool
     */
    private function isExcluded(string $path): bool
    {
        $parts = explode('/', $path);
        $existsParts = [];

        $locale = Locale::tryFrom($parts[0]);
        // если страница не с языка начинается, то seo не нужно
        if (!$locale) {
            return true;
        }

        foreach ($parts as $i => $part) {
            $p = trim($part);
            if ($i === 0 || $p === '' || Locale::tryFrom($p)) {
                continue;
            }

            $existsParts[] = $p;
        }

        $existsParts = array_map('mb_strtolower', $existsParts);

        foreach (self::CHECKER_EXCLUDE_CLASSES as $handle) {
            if ($this->checkClassExclude(new $handle, $existsParts)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Сюда попадает любой роут, которого не существует.
     *
     * @return Factory|\Illuminate\Foundation\Application|View|Redirector|Application|RedirectResponse
     */
    public function fallbackUrl(): Factory|\Illuminate\Foundation\Application|View|Redirector|Application|RedirectResponse
    {
        $currentURL = ltrim(trim(request()->getRequestUri()), '/');
        $locale = explode('?', explode('/', $currentURL)[0])[0];

        // это картинки всякие, которые не нужно редиректить
        if ($locale === 'assets') {
            return view('app');
        }

        $localeFromURL = Locale::tryFrom($locale);
        $locale = $localeFromURL;
        if (!$localeFromURL) {
            $locale = Locale::RU;
        }

        App::setLocale($locale->value);

        if (!$localeFromURL) {
            return redirect("/{$locale->value}/{$currentURL}");
        }

        return view('app');
    }

    private function getPath(): string
    {
        $path = trim(urldecode(request()->get('path', '')));
        if (!$path) {
            $path = request()->path();
        }

        return ltrim($path, '/');
    }

    /**
     * Проверяет каждый класс в константе и ищет совпадения, чтобы не выдавать seo тексты и не создавать их.
     * @param CheckerInterface $handle
     * @param array $parts
     * @return bool
     */
    private function checkClassExclude(CheckerInterface $handle, array $parts): bool
    {
        return $handle->check($parts);
    }
}
