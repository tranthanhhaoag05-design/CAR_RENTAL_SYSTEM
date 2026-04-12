<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// BẮT BUỘC KHAI BÁO MODEL
use App\Models\Booking;

class DriverController extends Controller
{
    // ==========================================
    // 1. XEM DANH SÁCH CUỐC XE ĐƯỢC PHÂN CÔNG
    // ==========================================
    public function myTrips(Request $request)
    {
        $user = $request->user();

        // Kiểm tra đúng Role tài xế
        if ($user->role !== 'driver') {
            return response()->json(['status' => 'error', 'message' => 'Bạn không phải là tài xế!'], 403);
        }

        // Lấy các đơn hàng mà driver_id chính là ID của tài xế này đang đăng nhập
        $trips = Booking::where('driver_id', $user->id)
                        ->orderBy('start_date', 'asc') // Sắp xếp chuyến nào chạy trước lên đầu
                        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $trips
        ]);
    }

    // ==========================================
    // 2. CẬP NHẬT TRẠNG THÁI CHUYẾN ĐI (Bắt đầu chạy / Hoàn thành)
    // ==========================================
    public function updateTripStatus(Request $request, $id)
    {
        $user = $request->user();

        if ($user->role !== 'driver') {
            return response()->json(['status' => 'error', 'message' => 'Bạn không phải là tài xế!'], 403);
        }

        $request->validate([
            'status' => 'required|in:active,completed' // Tài xế chỉ được phép chuyển sang Đang chạy hoặc Hoàn thành
        ]);

        $booking = Booking::findOrFail($id);

        // BẢO MẬT: Kiểm tra xem cuốc xe này có đúng là của tài xế này không? (Tránh trường hợp tài xế A cập nhật nhầm cuốc tài xế B)
        if ($booking->driver_id !== $user->id) {
            return response()->json(['status' => 'error', 'message' => 'Bạn không có quyền cập nhật chuyến xe của người khác!'], 403);
        }

        $booking->update([
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật tiến độ chuyến đi thành công!'
        ]);
    }
}
