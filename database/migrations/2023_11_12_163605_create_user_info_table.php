<?php

declare(strict_types=1);

use App\Enums\User\SexEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_info', function (Blueprint $table) {
            $table->unsignedInteger('user_id')->unique();
            $table->addColumn('string', 'city')->nullable();
            $table->enum('sex', SexEnum::values())->default(SexEnum::MALE->value);
            $table->boolean('is_am_pm')->default(false)->comment('Как юзеру выводить часы работы');
            $table->dateTimeTz('agreement_confirmed_at')->nullable()->comment('Дата, когда юзер дал согласие на политику конфиденциальности');
            $table->date('birthday')->nullable();
            $table->tinyInteger('gmt')->default(3);
            $table->unsignedTinyInteger('age')->default(0);
            $table->unsignedBigInteger('phone')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_info');
    }
};
