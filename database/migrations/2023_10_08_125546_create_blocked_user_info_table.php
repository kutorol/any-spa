<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blocked_user_info', function (Blueprint $table) {
            $table->integer('user_id')->unsigned()->unique();
            $table->text('comment')->comment('По какой причине был заблокирован юзер');
            $table->timestampTz('blocked_until')->default(\DB::raw("NOW() + INTERVAL '1' DAY"));
            $table->timestampsTz();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocked_user_info');
    }
};
