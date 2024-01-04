<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use App\Repositories\AB\ABTestRepository;
use App\Repositories\FeatureToggle\FeatureToggleRepository;
use App\Rules\Num\MinMaxInteger;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as ContractsLengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redis;

/**
 * @param string $key
 * @return null|array
 */
function redisGet(string $key): null | array
{
    try {
        $res = Redis::get($key);

        $r = $res ? json_decode($res, true) : null;
        if (is_null($r)) {
            return $r;
        }

        if (!is_array($r)) {
            return [];
        }

        return $r;
    } catch (Throwable|RedisException $e) {
        Log::error('redisGet has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);

        return null;
    }
}

function redisSetTTL(string $key, mixed $val, int $ttl): void
{
    try {
        // @phpstan-ignore-next-line
        Redis::set($key, json_encode($val), 'EX', $ttl);
    } catch (Throwable|RedisException $e) {
        Log::error('redisSetTTL has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);
    }
}

function redisDel(array $keys): void
{
    try {
        Redis::del($keys);
    } catch (Throwable|RedisException $e) {
        Log::error('redisDel has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);
    }
}

if (!function_exists('mb_ucfirst')) {
    function mb_ucfirst(string $text, string $encoding = 'UTF-8'): string
    {
        $firstChar = mb_substr($text, 0, 1, $encoding);
        $then = mb_substr($text, 1, null, $encoding);

        return mb_strtoupper($firstChar, $encoding).$then;
    }
}

/**
 * Валидирует на максимальное и минимальное значение бд.
 * @param string $key
 * @param int $val
 * @return bool
 */
function validateIntForDB(string $key, int $val): bool
{
    return Validator::make([$key => $val], [new MinMaxInteger()])->passes();
}

/**
 * Возвращает URL аватарки.
 * @param string|null $avatar
 * @param Carbon|null $date - дата нужна для сброса кэша в браузере, чтобы после изменения картинки она везде изменилась
 * @return string|null
 */
function getAvatarURL(?string $avatar = null, ?Carbon $date = null): ?string
{
    return getImageURL($avatar, $date, 'user-avatar');
}

/**
 * Возвращает URL картинки.
 * @param string|null $image
 * @param Carbon|null $date - дата нужна для сброса кэша в браузере, чтобы после изменения картинки она везде изменилась
 * @param null|string $folder
 * @return string|null
 */
function getImageURL(?string $image = null, ?Carbon $date = null, ?string $folder = null): ?string
{
    if (!$image) {
        return null;
    }

    if (str_starts_with($image, 'http')) {
        return $image;
    }

    $g = $date ? "?g={$date->timestamp}" : '';

    return $folder
        ? url("uploads/{$folder}/{$image}{$g}")
        : url("{$image}{$g}");
}

/**
 * Возвращает имя, фамилию и отчество из имени целиком
 * @param string|null $name
 * @return array
 */
function getSplitName(?string $name): array
{
    $fio = explode(' ', $name ?? '');

    return [
        'first_name' => $fio[1] ?? '',
        'last_name' => $fio[0] ?? '',
        'surname' => $fio[2] ?? '',
    ];
}

function getPage(?Request $request = null): int
{
    $request = $request ?: request();
    $page = (int)$request->get('page', 1);
    if ($page <= 0) {
        $page = 1;
    }

    return $page;
}

/**
 * Возвращает стандартный ответ от сервера для пагинации.
 * @param string $itemsField - поле, в котором хранятся сами данные
 * @param LengthAwarePaginator|ContractsLengthAwarePaginator $res
 * @return array
 */
function preparePaginationResponse(string $itemsField, LengthAwarePaginator|ContractsLengthAwarePaginator $res): array
{
    return [
        $itemsField => $res->items(),
        'page' => $res->currentPage(),
        'totalPages' => $res->lastPage(),
        'totalItems' => $res->total(),
    ];
}

/**
 * Возвращаем url до файлов из хранилища.
 * @param string $path
 * @return string[]
 */
function getFilesURL(string $path): array
{
    $urls = [];
    foreach (getFilesPath($path) as $filePath) {
        $urls[] = getImageURL($filePath);
    }

    return $urls;
}

/**
 * Возвращаем относительные пути к файлам из хранилища.
 * @param string $path
 * @param bool $isAllFiles - если true, то рекурсивно все файлы возьмет
 * @return string[]
 */
function getFilesPath(string $path, bool $isAllFiles = false): array
{
    return Storage::disk('public_assets')->files($path, $isAllFiles);
}

function failMsg(): string
{
    return __('system.error_catch_again');
}

function getPrettySiteName(): string
{
    // @phpstan-ignore-next-line
    return explode('//', Url::to('/'))[1] ?? Url::to('/');
}

// Включен ли тогл
function isToggleTurnOn(string $toggleName): bool
{
    return (int)app(FeatureToggleRepository::class)->findVal($toggleName) === 1;
}

// Находится ли текущий юзер в тогле
function isCurrentUserInToggle(string $toggleName): bool
{
    $userID = (int)(User::getCurrentUser()?->id ?? 0);
    if (!$userID) {
        return false;
    }

    return isUserInToggle($toggleName, $userID);
}

// Находится ли указанный юзер в тогле
function isUserInToggle(string $toggleName, int $userID): bool
{
    $val = app(FeatureToggleRepository::class)->findVal($toggleName);
    $userIDs = array_flip(array_filter(array_map(fn ($uid) => (int)$uid, explode(',', $val))));

    return isset($userIDs[$userID]);
}

// Возвращает все a/b тесты от юзера
function getUserABTests(): array
{
    $clientABTests = request()->header(BaseController::HEADER__X_REQUEST_AB_TESTS);
    $userABTests = $clientABTests ? json_decode($clientABTests, true) : [];

    $resUserTests = [];
    foreach ($userABTests as $testID => $testValueID) {
        $testID = (int)$testID;
        $testValueID = (int)$testValueID;
        if (!$testID || !$testValueID) {
            continue;
        }

        $resUserTests[$testID] = $testValueID;
    }

    if (empty($resUserTests)) {
        return [];
    }

    $tests = app(ABTestRepository::class)->findFromCache();
    foreach ($resUserTests as $testID => $valueID) {
        // если теста нет, то удаляем
        if (!isset($tests[$testID])) {
            unset($resUserTests[$testID]);
            continue;
        }

        // если значения такого нет у теста, то удаляем
        if (!in_array($valueID, $tests[$testID], true)) {
            unset($resUserTests[$testID]);
        }
    }

    return $resUserTests;
}

// Возвращает true, если это бот
function isCrawler(?string $userAgent = null): bool
{
    return (int)request('isCrawler', 0) === 1
        || (int)request()->header(BaseController::HEADER__X_REQUEST_CRAWLER) === 1
        || Crawler::isCrawler($userAgent);
}
