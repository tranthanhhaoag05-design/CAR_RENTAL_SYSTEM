<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehicleController; // 1. Nhúng Controller quản lý xe vào đây

// Route mặc định của hệ thống dùng để kiểm tra user đăng nhập
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 2. API lấy danh sách xe dành cho Frontend gọi
Route::get('/vehicles', [VehicleController::class, 'index']);