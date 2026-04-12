<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// BẮT BUỘC KHAI BÁO CÁC MODEL SẼ DÙNG
use App\Models\Booking;
use App\Models\User;
use App\Models\DriverSchedule;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    // Hàm dùng chung để kiểm tra quyền Chủ xe/Admin
    private function checkAdminRole($user)
    {
        if (!in_array($user->role, ['owner', 'admin'])) {
            abort(response()->json([
                'status' => 'error',
                'message' => 'Truy cập bị từ chối! Chỉ Chủ xe hoặc Admin mới có quyền này.'
            ], 403));
        }
    }

    // ==========================================
    // 1. DUYỆT ĐƠN (Từ 'pending' -> 'wait_deposit')
    // ==========================================
    public function approveBooking(Request $request, $id)
    {
        $this->checkAdminRole($request->user());

        $booking = Booking::findOrFail($id);

        if ($booking->status !== 'pending') {
            return response()->json(['status' => 'error', 'message' => 'Đơn hàng không ở trạng thái Chờ duyệt!'], 400);
        }

        $booking->update(['status' => 'wait_deposit']);

        return response()->json([
            'status' => 'success',
            'message' => 'Đã duyệt đơn! Khách hàng có thể tiến hành nộp cọc.'
        ]);
    }

    // ==========================================
    // 2. XÁC NHẬN ĐÃ NHẬN TIỀN CỌC (Từ 'wait_deposit' -> 'confirmed')
    // ==========================================
    public function confirmPayment(Request $request, $id)
    {
        $this->checkAdminRole($request->user());

        $booking = Booking::findOrFail($id);

        // Khách up bill xong thì payment_status là 'pending', hoặc status đơn là 'wait_deposit'
        if ($booking->status !== 'wait_deposit') {
            return response()->json(['status' => 'error', 'message' => 'Đơn hàng chưa đến bước xác nhận cọc!'], 400);
        }

        $booking->update([
            'status' => 'confirmed', // Đã chốt đơn
            'payment_status' => 'deposit_paid'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Xác nhận tiền cọc thành công! Đơn hàng đã được chốt.'
        ]);
    }

    // ==========================================
    // 3. PHÂN BỔ TÀI XẾ (Chỉ dành cho đơn 'with_driver' ở trạng thái 'confirmed')
    // ==========================================
    public function assignDriver(Request $request, $id)
    {
        $this->checkAdminRole($request->user());

        $request->validate([
            'driver_id' => 'required|exists:users,id'
        ]);

        $booking = Booking::findOrFail($id);
        
        // Kiểm tra xem đơn này có cần tài xế không
        if ($booking->service_type !== 'with_driver') {
            return response()->json(['status' => 'error', 'message' => 'Đây là đơn tự lái, không cần phân bổ tài xế!'], 400);
        }

        if ($booking->status !== 'confirmed') {
            return response()->json(['status' => 'error', 'message' => 'Chỉ được gán tài xế khi đơn đã chốt (Confirmed)!'], 400);
        }

        // Kiểm tra người được gán có đúng là tài xế không
        $driver = User::findOrFail($request->driver_id);
        if ($driver->role !== 'driver') {
            return response()->json(['status' => 'error', 'message' => 'Người dùng được chọn không phải là Tài xế!'], 400);
        }

        try {
            DB::beginTransaction();

            // Cập nhật người lái vào đơn
            $booking->update(['driver_id' => $driver->id]);

            // Thêm lịch trình vào bảng driver_schedules để khóa lịch tài xế
            DriverSchedule::create([
                'driver_id' => $driver->id,
                'booking_id' => $booking->id,
                'start_time' => $booking->start_date,
                'end_time' => $booking->end_date,
                'status' => 'busy'
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Đã gán tài xế ' . $driver->full_name . ' cho đơn hàng này!'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }
}