<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Other;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\JsonResponse;

class TermOfUsePolicy extends BaseController
{
    public function index(): JsonResponse
    {
        // todo getting from db and do markdown или маркдаун лучше в js сделать

        return $this->successResponse('', [
            'content' => 'Контент с правилами использования',
        ]);
    }
}
