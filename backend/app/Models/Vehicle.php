<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'plate_number', 
        'name', 
        'brand', 
        'type', 
        'transmission', 
        'price_per_day', 
        'status', 
        'image_url'
    ];

    // Mối quan hệ: 1 chiếc xe có thể có nhiều đơn đặt xe
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}