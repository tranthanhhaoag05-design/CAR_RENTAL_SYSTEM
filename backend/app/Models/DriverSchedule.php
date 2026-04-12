<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'driver_id', 
        'booking_id', 
        'start_time', 
        'end_time', 
        'status'
    ];

    // Lịch trình này thuộc về 1 tài xế (chính là bảng User)
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    // Lịch trình này của đơn đặt xe nào
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}