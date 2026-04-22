<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->string('location')->nullable()->after('image_url');
            $table->integer('seats')->nullable()->after('location');
            $table->string('fuel')->nullable()->after('seats');
            $table->string('tag')->nullable()->after('fuel');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['location', 'seats', 'fuel', 'tag']);
        });
    }
};