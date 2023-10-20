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
        Schema::create('tech_support_attachment', function (Blueprint $table) {
            $table->id();
            $table->integer('tech_support_id')->unsigned()->index();
            $table->addColumn('string', 'file_name');
            $table->timestampsTz();

            $table->foreign('tech_support_id')->references('id')->on('tech_support')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_support_attachment');
    }
};
