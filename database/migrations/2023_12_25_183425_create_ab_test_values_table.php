<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Таблица со значениями а/б тестов
        Schema::create('ab_test_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('ab_test_id');
            $table->unsignedInteger('total_user_with_value')->default(0)->comment('Сколько юзеров попало в выборку по данному значению теста');
            $table->addColumn('string', 'value')->comment('Значение теста');
            $table->timestampsTz();

            $table->foreign('ab_test_id')->references('id')->on('ab_test_group')->cascadeOnDelete();
            $table->unique(['ab_test_id', 'value']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ab_test_values');
    }
};
