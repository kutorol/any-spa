<?php

declare(strict_types=1);

use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\Admin\TechSupport\AdminTechSupportController;
use Illuminate\Support\Facades\Route;

// Роуты доступны от менеджера сайта до администратора сайта
Route::middleware(RolesEnum::ROLE_SITE_MANAGER)->prefix('/admin')->group(function () {
    // Тех. поддержка
    Route::prefix('/tech-support')->group(function () {
        Route::delete('', [AdminTechSupportController::class, 'delete'])
            ->name('support.delete');

        Route::post('/change-status', [AdminTechSupportController::class, 'changeStatus'])
            ->name('support.change_status');
    });
});
