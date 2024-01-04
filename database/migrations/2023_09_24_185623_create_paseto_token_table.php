<?php

declare(strict_types=1);

use App\Models\User\PasetoToken;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paseto_user_token', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->text('token')->index();
            $table->boolean('active')->default(true);

            $table->enum('token_type', [PasetoToken::ACCESS_TYPE, PasetoToken::REFRESH_TYPE])->default(PasetoToken::ACCESS_TYPE);

            $table->timestampTz('created_at')->default(DB::raw('NOW()'));
            $table->timestampTz('expires_at')->index();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            // у юзера может быть только один уникальный токен
            $table->unique(['user_id', 'token_type', 'active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paseto_user_token');
    }
};
