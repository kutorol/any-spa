<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\ConfirmPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Оставляем пути, чтобы отправка ссылки на восстановление пароля работала
Auth::routes();

// страница с показом, что вам необходимо подтвердить email
Route::get('/email/verify', [VerificationController::class, 'verifyNotice'])->name('verification.notice');
// страница по которой определяется юзер и проставляется верификация email
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
// страница показа восстановления пароля с формой пароля
Route::get('/pass/forgot/{email}/{token}', [ConfirmPasswordController::class, 'showFormWithPass'])->name('pass.forgot_show_form_with_pass');

Route::fallback(fn () => view('app'));
