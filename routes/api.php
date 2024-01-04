<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BaseController;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

require_once 'not_auth_api.php';
require_once 'auth_api.php';
require_once 'admin/admin_api.php';

// Срабатывает конкретно для апи, что такого роута нет
Route::fallback(function () {
    throw new RouteNotFoundException('Not found api route from fallback', BaseController::NOT_FOUND_CODE);
});
