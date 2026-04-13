<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'plate_number' => '51H-123.45',
                'name' => 'Mazda 3',
                'brand' => 'Mazda',
                'type' => 'Sedan',
                'transmission' => 'Automatic', // Số tự động
                'price_per_day' => 900000,     // Giá thuê 1 ngày
                'status' => 'available',       // Trạng thái: đang rảnh
                'image_url' => 'mazda3.png'
            ],
            [
                'plate_number' => '30F-999.99',
                'name' => 'Kia Sedona',
                'brand' => 'Kia',
                'type' => 'Minivan',
                'transmission' => 'Automatic',
                'price_per_day' => 1500000,
                'status' => 'available',
                'image_url' => 'sedona.png'
            ]
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}