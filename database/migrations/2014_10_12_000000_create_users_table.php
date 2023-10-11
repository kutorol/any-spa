<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->bigInteger('phone')->nullable();
            $table->enum('sex', [User::MALE, User::FEMALE])->default(User::MALE);
            $table->string('email')->unique();
            $table->timestampTz('email_verified_at')->nullable();
            $table->text('password');
            $table->text('avatar')->nullable();
            $table->string('locale')->default(config('app.locale'));
            $table->enum('role', User::roles())
                ->default(User::ROLE_USER)
                ->index('role_idx');
            $table->boolean('blocked')->default(false)->comment('Юзер был заблокирован');
            $table->timestampsTz();
            $table->softDeletesTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
