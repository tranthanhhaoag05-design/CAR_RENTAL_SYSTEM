<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
// Đơn đặt xe này của khách hàng nào? (Liên kết tới bảng users)
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    // Đơn đặt xe này được gán cho tài xế nào? (Liên kết tới bảng users)
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    // Đơn đặt xe này thuê chiếc xe nào? (Liên kết tới bảng vehicles)
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    // Đơn đặt xe này có những giấy tờ gì? (Đã có từ hôm qua)
    public function documents()
    {
        return $this->hasMany(BookingDocument::class);
    }
}