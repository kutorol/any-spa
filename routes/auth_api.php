<?php

declare(strict_types=1);

use App\Http\Controllers\Api\News\NewsController;
use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\User\InitRequestController;
use App\Http\Controllers\Api\User\ManageUserController;
use Illuminate\Support\Facades\Route;

// Только авторизованные
Route::middleware('auth:api')->group(function () {
    // Выход юзера
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    // Получение нового токена авторизации
    Route::post('/refresh-token-handle', [InitRequestController::class, 'initUserRequest'])->name('api.refreshTokenHandle');
    // При инициализации страницы идет проверка токена, что с ним все ок или он заменяется,
    // так же отдается ответ с юзером, если токены валидные
    Route::get('/init-request', [InitRequestController::class, 'initUserRequest'])->name('api.checkInitRequest');

    // Повторная отправка письма с подтверждением
    Route::post('/email/verification-notification', [AuthController::class, 'resendEmailVerify'])
        ->middleware('throttle:1,1')->name('verification.send');

    Route::prefix('user')->group(function () {
        Route::post('/change-profile', [ManageUserController::class, 'updateCurrentUser'])->name(
            'user.updateCurrentUser'
        );
        Route::post('/change-password', [ManageUserController::class, 'updateCurrentPassword'])->name(
            'user.updateCurrentPassword'
        );
        Route::post('/change-avatar', [ManageUserController::class, 'changeAvatar'])->name('user.changeAvatar');
        Route::put('/confirm-agreement', [ManageUserController::class, 'confirmAgreement'])->name(
            'user.confirmAgreement'
        );
        Route::put('/change-locale', [ManageUserController::class, 'changeLocale'])->name('api.user.changeLocale');
    });

    Route::prefix('/news')->group(function () {
        Route::post('/like', [NewsController::class, 'toggleLike'])->name('api.news.like');
        Route::get('/favorite', [NewsController::class, 'favorite'])->name('api.news.favorite');
    });
});
