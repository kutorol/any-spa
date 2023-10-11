<?php

declare(strict_types=1);

use App\Http\Controllers\Api\User\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    // Выход юзера
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    // Получение нового токена авторизации
    Route::post('/refresh-token-handle', [AuthController::class, 'refreshTokenHandle'])->name('api.refreshTokenHandle');
    // При инициализации страницы идет проверка токена, что с ним все ок или он заменяется,
    // так же отдается ответ с юзером, если токены валидные
    Route::get('/init-request', [AuthController::class, 'refreshTokenHandle'])->name('api.checkInitRequest');

    // Повторная отправка письма с подтверждением
    Route::post('/email/verification-notification', [AuthController::class, 'resendEmailVerify'])
        ->middleware('throttle:1,1')->name('verification.send');
});
