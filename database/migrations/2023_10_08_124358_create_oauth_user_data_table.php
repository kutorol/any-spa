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
        Schema::create('oauth_user_data', function (Blueprint $table) {
            $table->unsignedInteger('user_id')->index();

            $table->addColumn('string', 'oauth_id');
            $table->addColumn('string', 'oauth_email');
            $table->addColumn('string', 'oauth_title')->index()->comment('Из какой социальной сети делался запрос');
            $table->addColumn('string', 'oauth_locale')->nullable();
            $table->timestampsTz();

            $table->unique(['oauth_email', 'user_id', 'oauth_title']);
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_user_data');
    }
};
