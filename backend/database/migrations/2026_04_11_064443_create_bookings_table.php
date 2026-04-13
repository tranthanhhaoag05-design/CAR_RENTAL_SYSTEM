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
            Schema::create('bookings', function (Blueprint $table) {
                $table->id();
                // Khóa ngoại
                $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('vehicle_id')->constrained('cars')->onDelete('cascade');
                $table->foreignId('driver_id')->nullable()->constrained('users')->onDelete('set null'); // Có thể null nếu khách tự lái
                
                // Thông tin thuê
                $table->dateTime('start_date');
                $table->dateTime('end_date');
                $table->string('service_type'); // 'with_driver' hoặc 'self_drive'
                
                // Chi phí
                $table->decimal('total_price', 12, 2);
                $table->decimal('deposit_amount', 12, 2)->default(0);
                
                // Trạng thái
                $table->string('payment_status')->default('unpaid'); // 'paid', 'unpaid', 'partial_paid'
                $table->string('status')->default('pending'); // 'completed', 'pending', 'confirmed', 'cancelled'
                
                $table->timestamps();
            });
        }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
