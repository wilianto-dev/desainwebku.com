<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description');

            $table->string('icon')->nullable(); // icon class / image
            $table->integer('sort_order')->default(0);

            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('is_featured')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'is_featured']);
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};