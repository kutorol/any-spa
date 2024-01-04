<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin\Logs;

use App\Http\Controllers\Api\BaseController;
use App\Models\User\PasetoToken;
use File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Storage;

class AdminLogsController extends BaseController
{
    /**
     * Все лог файлы с сайта.
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $logs = Storage::disk('local_logs')->allFiles();
        $logs = array_diff($logs, ['.gitignore']);

        $single = 'single';
        $emergency = 'emergency_errors.log';

        usort($logs, function ($a, $b) use ($emergency, $single) {
            // эти самые верхние
            if ($a === $emergency) {
                return -1;
            }

            if ($b === $emergency) {
                return 1;
            }

            $aExplode = explode('/', $a)[0];
            $bExplode = explode('/', $b)[0];

            // вторыми идут от авторизации логи
            if ($aExplode === PasetoToken::LOG_CHANNEL && $bExplode !== PasetoToken::LOG_CHANNEL) {
                return -1;
            }

            // третьими логи single типа
            if ($aExplode === $single && $bExplode !== $single) {
                return -1;
            }

            // и все логи еще сортируются по времени последнего обновления файла
            return filemtime($this->getFilePath($a)) < filemtime($this->getFilePath($b));
        });

        $page = getPage($request);
        $onPage = 30;
        $total = count($logs);
        $totalPages = (int)ceil($total / $onPage);
        if ($page > $totalPages) {
            $page = $totalPages;
        }

        $logs = array_slice($logs, ($page - 1) * $onPage, $onPage);

        $logRes = [];
        foreach ($logs as $logPath) {
            $logRes[] = [
                'id' => base64_encode($logPath),
                'path' => $logPath,
                'date' => date('Y-m-d H:i:s', filemtime($this->getFilePath($logPath))),
            ];
        }

        return $this->successResponse('', preparePaginationResponse(
            'logs',
            new LengthAwarePaginator($logRes, $total, $onPage, $page)
        ));
    }

    /**
     * Информация по конкретному лог файлу.
     * @param string $id
     * @return JsonResponse
     */
    public function info(string $id): JsonResponse
    {
        $logPath = base64_decode($id);

        return $this->successResponse('', [
            'log' => [
                'id' => $id,
                'path' => $logPath,
                'content' => file_get_contents($this->getFilePath($logPath)),
            ],
        ]);
    }

    /**
     * Удаление одного лог файла.
     * @return JsonResponse
     */
    public function deleteLog(): JsonResponse
    {
        $path = trim(request('path', ''));
        if (!$path) {
            return $this->validationResponse(__('logs.admin.delete.no_path'));
        }

        $fullPath = $this->getFilePath($path);
        if (!file_exists($fullPath)) {
            return $this->notFoundResponse(__('logs.admin.delete.not_found'));
        }

        if (!File::delete($fullPath)) {
            return $this->internalResponse(failMsg());
        }

        return $this->successResponse(__('logs.admin.delete.success'));
    }

    /**
     * Отдает полный путь к файлу.
     * @param string $filePath
     * @return string
     */
    private function getFilePath(string $filePath): string
    {
        return storage_path("logs/{$filePath}");
    }
}
