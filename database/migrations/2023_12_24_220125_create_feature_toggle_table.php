<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('feature_toggle', function (Blueprint $table) {
            $table->id();
            $table->addColumn('string', 'name')->unique();
            $table->addColumn('string', 'value');
            $table->addColumn('string', 'comment');
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_toggle');
    }
};
