<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('news_duplicate', function (Blueprint $table) {
            $table->comment('Таблица с новостями, которые дублируются на других языках для быстрого поиска');
            $table->unsignedInteger('news_id');
            $table->unsignedInteger('duplicate_news_id');
            $table->timestampsTz();
            $table->foreign('news_id')->references('id')->on('news')->cascadeOnDelete();
            $table->foreign('duplicate_news_id')->references('id')->on('news')->cascadeOnDelete();

            $table->unique(['news_id', 'duplicate_news_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_duplicate');
    }
};
