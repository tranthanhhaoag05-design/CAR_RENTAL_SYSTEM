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
            Schema::create('cars', function (Blueprint $table) {
                $table->id();
                $table->string('plate_number')->unique(); // Biển số xe
                $table->string('name');                   // Tên xe (VD: Mazda 3)
                $table->string('brand');                  // Hãng xe (VD: Mazda)
                $table->string('type');                   // Loại xe (VD: Sedan, SUV)
                $table->string('transmission');           // Hộp số (VD: Automatic, Manual)
                $table->decimal('price_per_day', 10, 2);  // Giá thuê 1 ngày
                $table->string('status')->default('available'); // Trạng thái
                $table->string('image_url')->nullable();  // Link ảnh xe
                $table->timestamps();
            });
        }
};
