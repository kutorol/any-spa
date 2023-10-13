<?php

declare(strict_types=1);

use App\Enums\User\RolesEnum;
use App\Enums\User\SexEnum;
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
            $table->tinyInteger('age')->unsigned()->default(0);
            $table->enum('sex', [SexEnum::MALE, SexEnum::FEMALE])->default(SexEnum::MALE);
            $table->string('email')->unique();
            $table->timestampTz('email_verified_at')->nullable();
            $table->text('password');
            $table->text('avatar')->nullable();
            $table->string('locale')->default(config('app.locale'));
            $table->enum('role', RolesEnum::roles())
                ->default(RolesEnum::ROLE_USER)
                ->index('role_idx');
            $table->boolean('is_am_pm')->default(false)->comment('Как юзеру выводить часы работы');
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
