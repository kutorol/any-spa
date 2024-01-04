<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Таблица с а/б тестами
        Schema::create('ab_test_group', function (Blueprint $table) {
            $table->id();
            $table->addColumn('string', 'key')->unique()->comment('Название теста');
            $table->unsignedTinyInteger('total_percent_from_users')->default(0)->comment('Сколько юзеров в процентах нужно установить на момент создания теста');
            $table->unsignedInteger('total_users_in_test')->default(0)->comment('Сколько сейчас юзеров попали в тест');
            $table->unsignedInteger('max_count_users_in_test')->default(0)->comment('Сколько максимум юзеров попадет в тест');
            $table->boolean('active')->default(false)->comment('Активен ли а/б тест');
            $table->addColumn('string', 'comment')->nullable()->comment('Комментарий админа');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ab_test_group');
    }
};
