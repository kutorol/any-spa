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
        Schema::create('tech_support_admin_response', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('tech_support_id')->index();
            $table->unsignedInteger('user_id')->index();
            $table->addColumn('string', 'status');
            $table->text('comment');
            $table->timestampsTz();

            $table->foreign('tech_support_id')->references('id')->on('tech_support')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_support_admin_response');
    }
};
