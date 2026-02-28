<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('service_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();

            $table->json('features')->nullable();

            $table->decimal('price', 15, 2);
            $table->integer('duration')->nullable(); // in days

            $table->integer('sort_order')->default(0);

            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('is_popular')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['service_id', 'status']);
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};