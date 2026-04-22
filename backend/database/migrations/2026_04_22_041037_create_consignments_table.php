<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consignments', function (Blueprint $table) {
            $table->id();

            // Người gửi xe
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            // Thông tin xe ký gửi
            $table->string('car_name');
            $table->string('brand')->nullable();
            $table->string('plate_number')->nullable();
            $table->integer('seats')->nullable();
            $table->string('transmission')->nullable();
            $table->string('fuel')->nullable();

            // Giá đề xuất
            $table->integer('price_per_day')->nullable();

            // Hình ảnh
            $table->text('image_url')->nullable();

            // Trạng thái
            $table->string('status')->default('pending'); 
            // pending | approved | rejected

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consignments');
    }
};