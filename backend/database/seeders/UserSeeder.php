<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username' => 'admin_gia_bao',
                'phone_number' => '0901111111',
                'password_hash' => Hash::make('password123'),
                'full_name' => 'Quản Trị Viên Bảo',
                'role' => 'admin',
                'is_active' => true,
            ],
            [
                'username' => 'owner_tuan_anh',
                'phone_number' => '0902222222',
                'password_hash' => Hash::make('password123'),
                'full_name' => 'Chủ Xe Tuấn Anh',
                'role' => 'owner',
                'is_active' => true,
            ],
            [
                'username' => 'driver_van_a',
                'phone_number' => '0903333333',
                'password_hash' => Hash::make('password123'),
                'full_name' => 'Tài Xế Văn A',
                'role' => 'driver',
                'is_active' => true,
            ],
            [
                'username' => 'customer_thi_b',
                'phone_number' => '0904444444',
                'password_hash' => Hash::make('password123'),
                'full_name' => 'Khách Hàng Thị B',
                'role' => 'customer',
                'is_active' => true,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}