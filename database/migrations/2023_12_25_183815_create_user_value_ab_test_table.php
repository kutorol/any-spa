<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Значение а/б теста у конкретного юзера
        Schema::create('user_value_ab_test', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('ab_test_id')->index();
            $table->unsignedInteger('ab_test_values_id')->index();
            $table->timestampsTz();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('ab_test_id')->references('id')->on('ab_test_group')->cascadeOnDelete();
            $table->foreign('ab_test_values_id')->references('id')->on('ab_test_values')->cascadeOnDelete();
            $table->unique(['user_id', 'ab_test_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_value_ab_test');
    }
};
