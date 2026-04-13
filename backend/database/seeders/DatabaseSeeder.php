<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Gọi các seeder theo thứ tự bảng độc lập trước, bảng phụ thuộc sau
        $this->call([
            UserSeeder::class,
            VehicleSeeder::class,
            BookingSeeder::class,
        ]);
    }
}