<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 
        'amount', 
        'payment_method', 
        'proof_image_url', 
        'verified_by'
    ];

    // Mối quan hệ: Giao dịch này thuộc về 1 đơn đặt xe
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    // Mối quan hệ: Giao dịch này được duyệt bởi ai (Admin/Chủ xe)
    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}