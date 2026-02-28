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
       Schema::create('orders', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('package_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('order_number')->unique();

    $table->enum('status', [
        'pending',
        'paid',
        'in_progress',
        'completed',
        'cancelled'
    ])->default('pending');

    $table->decimal('total_price', 15, 2);

    $table->text('notes')->nullable();

    $table->timestamp('paid_at')->nullable();
    $table->timestamp('started_at')->nullable();
    $table->timestamp('completed_at')->nullable();

    $table->timestamps();
    $table->softDeletes();

    $table->index(['user_id', 'status']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
