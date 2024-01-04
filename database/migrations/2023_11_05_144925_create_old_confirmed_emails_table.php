<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('old_confirmed_emails', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->string('email');
            $table->timestampsTz();
            $table->unique(['user_id', 'email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('old_confirmed_emails');
    }
};
