<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle; // Nhớ import Model
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        // Lấy tất cả danh sách xe từ DB
        $vehicles = Vehicle::all();

        // Trả về định dạng JSON chuẩn cho Tuấn Anh
        return response()->json([
            'status' => 'success',
            'data' => $vehicles
        ], 200);
    }
}
