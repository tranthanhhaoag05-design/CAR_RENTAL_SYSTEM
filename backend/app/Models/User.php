<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Quan trọng: Bắt buộc phải có dòng này để tạo Token

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Cập nhật lại cho đúng ERD của nhóm
    protected $fillable = [
        'full_name',
        'phone_number',
        'username',
        'password_hash', 
        'role',
        'is_active',
    ];

    // Ẩn cột mật khẩu khi trả dữ liệu về dạng JSON cho an toàn
    protected $hidden = [
        'password_hash',
        'remember_token',
    ];
}