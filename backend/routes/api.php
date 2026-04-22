<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\ConsignmentController;

/*
|--------------------------------------------------------------------------
| A. CÁC API CÔNG KHAI
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

// Ký gửi public tạm thời
Route::post('/consignments', [ConsignmentController::class, 'store']);
Route::get('/consignments', [ConsignmentController::class, 'index']);

/*
|--------------------------------------------------------------------------
| B. CÁC API BẢO MẬT
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // KHÁCH HÀNG
    Route::post('/check-driver', [BookingController::class, 'checkDriverAvailability']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
    Route::post('/bookings/{id}/payment', [PaymentController::class, 'uploadBill']);
    Route::post('/bookings/{id}/reviews', [BookingController::class, 'review']);

    // ADMIN
    Route::get('/admin/bookings', [BookingController::class, 'index']);
    Route::get('/admin/users', [AuthController::class, 'users']);
    Route::put('/admin/bookings/{id}/approve', [AdminController::class, 'approveBooking']);
    Route::put('/admin/bookings/{id}/confirm-payment', [AdminController::class, 'confirmPayment']);
    Route::put('/admin/bookings/{id}/assign-driver', [AdminController::class, 'assignDriver']);
    Route::put('/admin/bookings/{id}/status', [AdminController::class, 'updateBookingStatus']);

    // TÀI XẾ
    Route::get('/driver/trips', [DriverController::class, 'myTrips']);
    Route::put('/driver/trips/{id}/status', [DriverController::class, 'updateTripStatus']);

    // KÝ GỬI ADMIN
    Route::put('/consignments/{id}/status', [ConsignmentController::class, 'updateStatus']);
});