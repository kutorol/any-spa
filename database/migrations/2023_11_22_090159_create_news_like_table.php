<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('news_like', function (Blueprint $table) {
            $table->unsignedInteger('news_id');
            $table->unsignedInteger('user_id')->index();
            $table->timestampsTz();

            $table->unique(['news_id', 'user_id']);

            $table->foreign('news_id')->references('id')->on('news')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_like');
    }
};
