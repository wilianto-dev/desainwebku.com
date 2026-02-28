<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('portfolios', function (Blueprint $table) {
    $table->id();

    $table->foreignId('service_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    $table->string('title');
    $table->string('slug')->unique();
    $table->longText('description');

    $table->string('image');

    $table->json('technologies')->nullable();
    $table->json('results')->nullable();

    $table->enum('status', ['draft', 'published'])
        ->default('draft');

    $table->date('completion_date')->nullable();
    $table->timestamp('published_at')->nullable();

    $table->timestamps();
    $table->softDeletes();

    $table->index(['status', 'service_id']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
