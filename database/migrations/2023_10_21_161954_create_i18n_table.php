<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('i18n', function (Blueprint $table) {
            $table->id();
            $table->text('label');
            $table->text('value');
            $table->text(BaseController::LOCALE_PARAM);
            $table->timestampsTz();

            $table->unique(['label', BaseController::LOCALE_PARAM]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('i18n');
    }
};
