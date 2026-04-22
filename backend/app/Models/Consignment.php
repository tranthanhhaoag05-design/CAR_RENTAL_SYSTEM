<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_name',
        'brand',
        'plate_number',
        'seats',
        'transmission',
        'fuel',
        'price_per_day',
        'image_url',
        'status',
    ];

    protected $casts = [
        'seats' => 'integer',
        'price_per_day' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}