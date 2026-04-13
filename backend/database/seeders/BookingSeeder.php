<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $bookings = [
            // Đơn 1: Đã hoàn thành (Có tài xế)
            [
                'customer_id' => 4, // ID của customer_thi_b
                'vehicle_id' => 1,  // ID của Toyota Vios
                'driver_id' => 3,   // ID của driver_van_a
                'start_date' => Carbon::now()->subDays(5),
                'end_date' => Carbon::now()->subDays(3),
                'service_type' => 'with_driver',
                'total_price' => 2000000, // (800k xe + phí tài xế) * 2 ngày
                'deposit_amount' => 500000,
                'payment_status' => 'paid',
                'status' => 'completed',
            ],
            // Đơn 2: Đang chờ duyệt (Tự lái)
            [
                'customer_id' => 4,
                'vehicle_id' => 2,
                'driver_id' => null, 
                'start_date' => Carbon::now()->addDays(1),
                'end_date' => Carbon::now()->addDays(4),
                'service_type' => 'self_drive',
                'total_price' => 3600000, // 1tr2 * 3 ngày
                'deposit_amount' => 1000000,
                'payment_status' => 'unpaid',
                'status' => 'pending',
            ],
            // Đơn 3: Đã xác nhận, đang trong thời gian thuê
            [
                'customer_id' => 4,
                'vehicle_id' => 3,
                'driver_id' => null,
                'start_date' => Carbon::now()->subDays(1),
                'end_date' => Carbon::now()->addDays(2),
                'service_type' => 'self_drive',
                'total_price' => 4500000,
                'deposit_amount' => 1500000,
                'payment_status' => 'partial_paid',
                'status' => 'confirmed',
            ]
        ];

        foreach ($bookings as $booking) {
            Booking::create($booking);
        }
    }
}