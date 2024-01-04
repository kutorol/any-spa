<?php

declare(strict_types=1);

use App\Enums\User\RolesEnum;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->string('email')->unique();
            $table->timestampTz('email_verified_at')->nullable();
            $table->text('password');
            $table->text('avatar')->nullable();
            $table->string(BaseController::LOCALE_PARAM)->default(config('app.locale'));
            $table->text('role')->default(RolesEnum::USER->value);
            $table->boolean('blocked')->default(false)->comment('Юзер был заблокирован');
            $table->timestampsTz();
            $table->softDeletesTz();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
