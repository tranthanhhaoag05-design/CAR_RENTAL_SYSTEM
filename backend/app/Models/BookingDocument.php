<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 
        'doc_type', 
        'image_url', 
        'verification_status'
    ];

    // Mối quan hệ: Giấy tờ này thuộc về 1 đơn đặt xe
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}