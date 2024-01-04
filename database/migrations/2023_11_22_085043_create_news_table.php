<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id')->index();
            $table->string(BaseController::LOCALE_PARAM)->index();
            $table->text('title');
            $table->text('image');
            $table->text('text');
            $table->text('short_text');
            $table->text('slug');
            $table->unsignedInteger('views')->default(0);
            $table->unsignedInteger('likes')->default(0);
            $table->timestampsTz();
            $table->softDeletesTz();

            $table->foreign('user_id')->references('id')->on('users')->noActionOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
