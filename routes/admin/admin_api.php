<?php

declare(strict_types=1);

use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\Admin\ABTest\AdminAbTestController;
use App\Http\Controllers\Api\Admin\FeatureToggle\AdminFeatureToggleController;
use App\Http\Controllers\Api\Admin\I18n\AdminI18nController;
use App\Http\Controllers\Api\Admin\Logs\AdminLogsController;
use App\Http\Controllers\Api\Admin\News\AdminNewsController;
use App\Http\Controllers\Api\Admin\TechSupport\AdminTechSupportController;
use Illuminate\Support\Facades\Route;

// Роуты доступны от менеджера сайта до администратора сайта
Route::middleware(RolesEnum::SITE_MANAGER->value)->prefix('/admin')->group(function () {
    // Новости
    Route::prefix('/news')->group(function () {
        // Все новости
        Route::get('/', [AdminNewsController::class, 'index'])->name('api.admin.news.all');
        // Возвращает все загруженные картинки для конкретной новости
        Route::get('/uploaded-news-images/{id}', [AdminNewsController::class, 'findUploadedNewsImages'])->name('api.admin.news.uploadedNewsImages');
        // Обновление новости
        Route::post('/edit', [AdminNewsController::class, 'edit'])->name('api.admin.news.edit');
        // Загрузка картинки для новости
        Route::post('/upload-image', [AdminNewsController::class, 'uploadImage'])->name('api.admin.news.uploadImage');
        // Создание новости
        Route::post('/', [AdminNewsController::class, 'create'])->name('api.admin.news.create');
        // Удаление конкретной картинки в новости
        Route::delete('/delete-image', [AdminNewsController::class, 'deleteImage'])->name('api.admin.news.deleteImage');
        // Удаление всех неиспользуемых картинок в новости
        Route::delete('/clear-unused-images', [AdminNewsController::class, 'clearUnusedImages'])->name('api.admin.news.clearUnusedImages');
        // Только для главных админов
        Route::middleware(RolesEnum::SITE_ADMIN->value)->group(function () {
            // Удаление новости и всех ее связей
            Route::delete('/delete', [AdminNewsController::class, 'delete'])->name('api.admin.news.delete');
        });
        // Получение новости, которая будет дублировать новость на другом языке
        Route::get('/duplicate/{id}/{lang}', [AdminNewsController::class, 'duplicateInfo'])->name('api.admin.news.duplicateInfo');
        // Информация по конкретной новости
        Route::get('/{id}', [AdminNewsController::class, 'info'])->name('api.admin.news.info');
    });

    // Тех. поддержка
    Route::prefix('/tech-support')->group(function () {
        // Удаление вопроса в техподдержку
        Route::delete('', [AdminTechSupportController::class, 'delete'])
            ->name('api.admin.support.delete');

        // Удаление прикрепленного файла
        Route::delete('/attach', [AdminTechSupportController::class, 'deleteAttach'])
            ->name('api.admin.support.delete_attach');

        // Обновление вопроса (изменение статуса и ответ админа тут)
        Route::post('/change-status', [AdminTechSupportController::class, 'changeStatus'])
            ->name('api.admin.support.change_status');

        // Список всех вопросов
        Route::get('/list', [AdminTechSupportController::class, 'list'])
            ->name('api.admin.support.list');

        // Конкретный вопрос
        Route::get('/{id}', [AdminTechSupportController::class, 'info'])
            ->name('api.admin.support.info');
    });

    // Логи сайта (только главный админ может смотреть)
    Route::middleware(RolesEnum::SITE_ADMIN->value)->prefix('/logs')->group(function () {
        // Список всех логов
        Route::get('/list', [AdminLogsController::class, 'index'])->name('api.admin.logs.list');
        // Вывод контента конкретного лога
        Route::get('/{id}', [AdminLogsController::class, 'info'])->name('api.admin.logs.info');
        // Удаление одного лога
        Route::delete('/', [AdminLogsController::class, 'deleteLog'])->name('api.admin.logs.deleteLog');
    });

    // Переводы сайта
    Route::prefix('/i18n')->group(function () {
        // Список всех переводов
        Route::get('/list', [AdminI18nController::class, 'index'])->name('api.admin.i18n.list');
        // Добавляем/обновляем перевод
        Route::post('upsert', [AdminI18nController::class, 'upsert'])->name('api.admin.i18n.upsert');
    });

    // Фичатоглы сайта
    Route::prefix('/toggle')->group(function () {
        // Список всех тоглов
        Route::get('/list', [AdminFeatureToggleController::class, 'index'])->name('api.admin.toggle.list');
        // Добавляем/обновляем тогл
        Route::post('update', [AdminFeatureToggleController::class, 'upsert'])->name('api.admin.toggle.upsert');
        // Добавляем тогл
        Route::post('create', [AdminFeatureToggleController::class, 'create'])->name('api.admin.toggle.create');
        // Только для главных админов
        Route::middleware(RolesEnum::SITE_ADMIN->value)->group(function () {
            // удаляем тогл
            Route::delete('delete', [AdminFeatureToggleController::class, 'delete'])->name('api.admin.toggle.delete');
        });
    });

    // A/B тесты
    Route::prefix('/ab')->group(function () {
        // Список всех тестов
        Route::get('/list', [AdminAbTestController::class, 'index'])->name('api.admin.ab.list');
        // Добавляем/обновляем тест
        Route::post('update', [AdminAbTestController::class, 'upsert'])->name('api.admin.ab.upsert');
        // Добавляем тест
        Route::post('create', [AdminAbTestController::class, 'create'])->name('api.admin.ab.create');
        // Только для главных админов
        Route::middleware(RolesEnum::SITE_ADMIN->value)->group(function () {
            // удаляем тест
            Route::delete('delete', [AdminAbTestController::class, 'delete'])->name('api.admin.ab.delete');
        });
        // Вся информация по а/б тесту
        Route::get('/{id}', [AdminAbTestController::class, 'info'])->name('api.admin.ab.info');
    });
});
