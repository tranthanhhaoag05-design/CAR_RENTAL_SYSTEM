<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['phone_number' => '0375248772'],
            [
                'username' => 'admin',
                'full_name' => 'Admin GoDriver',
                'phone_number' => '0375248772',
                'password_hash' => Hash::make('123456'),
                'role' => 'admin',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['phone_number' => '0912345678'],
            [
                'username' => 'userdemo',
                'full_name' => 'User Demo',
                'phone_number' => '0912345678',
                'password_hash' => Hash::make('123456'),
                'role' => 'customer',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}