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
            Schema::create('payments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
                $table->decimal('amount', 12, 2); // Số tiền đã thanh toán
                $table->string('payment_method'); // 'bank_transfer', 'cash', 'momo'
                $table->string('transaction_id')->nullable(); // Mã giao dịch của ngân hàng (nếu có)
                $table->string('proof_image_url')->nullable(); // Link ảnh bill chuyển khoản
                $table->string('status')->default('pending'); // 'pending', 'success', 'failed'
                $table->timestamps();
            });
        }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
