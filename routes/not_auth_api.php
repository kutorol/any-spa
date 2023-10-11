<?php

declare(strict_types=1);

use App\Http\Controllers\Api\OAuth\GoogleOAuthController;
use App\Http\Controllers\Api\Other\TermOfUsePolicy;
use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\User\ForgotController;
use App\Http\Middleware\Custom\Roles\IsGuest;
use Illuminate\Support\Facades\Route;

// Политика конфиденциальности и использования
Route::get('/term-of-use-private-policy', [TermOfUsePolicy::class, 'index'])->name('termOfUsePrivatePolicy');

// Группа авторизации через соц. сети
Route::middleware('throttle:5,1')->prefix('/oauth')->group(function () {
    // Авторизация через Google
    Route::post('/google', [GoogleOAuthController::class, 'index'])->name('googleOAuth');
});

Route::middleware(IsGuest::MIDDLEWARE_NAME)->group(function () {
    Route::middleware('throttle:5,1')->group(function () {
        // Регистрация
        Route::post('/register', [AuthController::class, 'register'])->name('api.register');
        // Вход
        Route::post('/login', [AuthController::class, 'login'])->name('api.login');
    });

    // Восстановление пароля
    Route::prefix('/pass')->group(function () {
        // Отправляем ссылку на восстановление пароля
        Route::post('/forgot', [ForgotController::class, 'forgot'])->middleware('throttle:100,1')->name('api.pass_forgot');
        // Восстанавливаем пароль по ссылке
        Route::post('/reset/{url_token}', [ForgotController::class, 'reset'])->middleware('throttle:10,1')->name('api.pass_reset');
    });
});
