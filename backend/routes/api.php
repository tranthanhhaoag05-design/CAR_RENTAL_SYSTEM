<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DriverController;

/*
|--------------------------------------------------------------------------
| A. CÁC API CÔNG KHAI (Không cần đăng nhập)
|--------------------------------------------------------------------------
*/
// UC_LOGIN_WEB: Đăng ký / Đăng nhập
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// UC1: Tìm kiếm & Xem danh sách xe
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

/*
|--------------------------------------------------------------------------
| B. CÁC API BẢO MẬT (Bắt buộc phải có Token đăng nhập)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Lấy thông tin user đang đăng nhập
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // ================= PHÂN HỆ KHÁCH HÀNG =================
    // UC_AUTO_CHECK: Kiểm tra tài xế rảnh
    Route::post('/check-driver', [BookingController::class, 'checkDriverAvailability']);
    
    // UC5: Đặt xe & Tải giấy tờ
    Route::post('/bookings', [BookingController::class, 'store']); 
    
    // UC9 & UC13: Xem lịch sử và theo dõi trạng thái
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
    
    // UC7: Thanh toán tiền cọc (Upload bill)
    Route::post('/bookings/{id}/payment', [PaymentController::class, 'uploadBill']);
    
    // UC18: Đánh giá
    Route::post('/bookings/{id}/reviews', [BookingController::class, 'review']);

    // ================= PHÂN HỆ CHỦ XE / ADMIN =================
    // UC14: Duyệt đơn đặt xe
    Route::put('/admin/bookings/{id}/approve', [AdminController::class, 'approveBooking']);
    
    // UC_CONFIRM_PAY: Xác nhận đã nhận tiền cọc
    Route::put('/admin/bookings/{id}/confirm-payment', [AdminController::class, 'confirmPayment']);
    
    // UC17: Phân bổ tài xế
    Route::put('/admin/bookings/{id}/assign-driver', [AdminController::class, 'assignDriver']);
    
    // UC15: Cập nhật trạng thái Giao xe / Thu hồi xe
    Route::put('/admin/bookings/{id}/status', [AdminController::class, 'updateBookingStatus']);

    // ================= PHÂN HỆ TÀI XẾ =================
    // Lấy danh sách cuốc xe được gán
    Route::get('/driver/trips', [DriverController::class, 'myTrips']);
    
    // UC16: Nhận chuyến & Cập nhật tiến độ
    Route::put('/driver/trips/{id}/status', [DriverController::class, 'updateTripStatus']);
});