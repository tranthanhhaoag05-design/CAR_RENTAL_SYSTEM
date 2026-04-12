<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// BẮT BUỘC PHẢI KHAI BÁO 2 MODEL NÀY ĐỂ TƯƠNG TÁC VỚI DATABASE
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function uploadBill(Request $request, $bookingId)
    {
        // 1. Validation dữ liệu đầu vào
        $request->validate([
            'proof_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'amount'      => 'required|numeric|min:0'
        ]);

        // 2. Lấy thông tin đơn hàng
        $booking = Booking::findOrFail($bookingId);

        // --- 2 CHỐT CHẶN BẢO MẬT BỔ SUNG ---
        
        // Chốt 1: Chỉ chủ nhân của đơn hàng mới được up bill
        if ($booking->customer_id !== $request->user()->id) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Bạn không có quyền thanh toán cho đơn đặt xe này!'
            ], 403);
        }

        // Chốt 2: Đơn hàng phải đang ở trạng thái "Chờ cọc" thì mới nhận bill
        if ($booking->status !== 'wait_deposit') {
            return response()->json([
                'status'  => 'error',
                'message' => 'Đơn hàng này không ở trạng thái yêu cầu thanh toán!'
            ], 400);
        }

        // --- KẾT THÚC BẢO MẬT ---

        try {
            DB::beginTransaction();

            // 3. Lưu ảnh bill vào storage (thư mục storage/app/public/payments)
            $path = $request->file('proof_image')->store('public/payments');
            $url = asset(str_replace('public/', 'storage/', $path));

            // 4. Tạo record thanh toán
            $payment = Payment::create([
                'booking_id'      => $booking->id,
                'amount'          => $request->amount,
                'proof_image_url' => $url,
                'payment_method'  => 'bank_transfer'
            ]);

            // 5. Cập nhật lại trạng thái thanh toán của Booking
            // Để Chủ xe biết là Khách đã up bill và cần vào kiểm tra
            $booking->update([
                'payment_status' => 'pending' // pending ở đây nghĩa là "Chờ chủ xe xác nhận"
            ]);

            DB::commit();

            return response()->json([
                'status'  => 'success',
                'message' => 'Đã gửi minh chứng thanh toán thành công! Vui lòng chờ Chủ xe xác nhận.',
                'data'    => $payment
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => 'error',
                'message' => 'Lỗi hệ thống khi xử lý thanh toán: ' . $e->getMessage()
            ], 500);
        }
    }
}