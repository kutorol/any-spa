<?php

declare(strict_types=1);

use App\Enums\TechSupport\TechSupportStatus;
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
        Schema::create('tech_support', function (Blueprint $table) {
            $table->id();
            $table->addColumn('string', 'email');
            $table->unsignedInteger('user_id')->nullable();
            $table->addColumn('string', 'type');
            $table->addColumn('string', 'status')->default(TechSupportStatus::STATUS_CREATED->value)->index();
            $table->text('comment');
            $table->text(BaseController::LOCALE_PARAM)->default(config('app.locale'));
            $table->addColumn('string', 'from_url')->nullable()->default(null);
            $table->addColumn('string', 'user_agent')->nullable()->default(null);
            $table->addColumn('string', 'ip')->nullable()->default(null);
            $table->timestampsTz();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_support');
    }
};
