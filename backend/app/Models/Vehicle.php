<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    // Đang dùng bảng cars (giữ nguyên cho đúng với DB hiện tại)
    protected $table = 'cars';

    // Nếu bảng không có created_at / updated_at thì bật dòng này
    // public $timestamps = false;

    protected $fillable = [
        'plate_number', 
        'name', 
        'brand', 
        'type', 
        'transmission', 
        'price_per_day', 
        'status', 
        'image_url',

        // 🔥 thêm sẵn để sau này dùng với FE (mockData)
        'location',
        'seats',
        'fuel',
        'tag'
    ];

    // Ép kiểu dữ liệu (không bắt buộc nhưng nên có)
    protected $casts = [
        'price_per_day' => 'integer',
        'seats' => 'integer',
    ];

    // Mối quan hệ: 1 xe có nhiều booking
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}