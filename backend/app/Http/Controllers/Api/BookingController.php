<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDocument;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. KIỂM TRA DỮ LIỆU ĐẦU VÀO (VALIDATION)
        $request->validate([
            'vehicle_id'   => 'required|exists:vehicles,id',
            'start_date'   => 'required|date|after_or_equal:today',
            'end_date'     => 'required|date|after:start_date',
            'service_type' => 'required|in:self_drive,with_driver',
            
            // Yêu cầu ảnh (tối đa 2MB mỗi ảnh)
            'cccd_front'   => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'cccd_back'    => 'required|image|mimes:jpeg,png,jpg|max:2048',
            // Nếu chọn "Tự lái" thì bắt buộc phải có ảnh Bằng Lái Xe (GPLX)
            'gplx'         => 'required_if:service_type,self_drive|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // 2. BẮT ĐẦU QUÁ TRÌNH LƯU DỮ LIỆU AN TOÀN
        try {
            DB::beginTransaction(); // Khóa Database lại để bắt đầu ghi

            // Lấy ID của User đang đăng nhập (nhờ có Sanctum token)
            $userId = $request->user()->id;

            // A. Lưu thông tin Booking trước
            $booking = Booking::create([
                'customer_id'    => $userId,
                'vehicle_id'     => $request->vehicle_id,
                'start_date'     => $request->start_date,
                'end_date'       => $request->end_date,
                'service_type'   => $request->service_type,
                'status'         => 'pending', // Trạng thái: Chờ duyệt (Chuẩn theo State Diagram)
                'total_price'    => 0, // Tạm gán 0, phần tính tiền sẽ làm ở hàm riêng sau
                'deposit_amount' => 0,
                'payment_status' => 'pending'
            ]);

            // B. Xử lý Upload Ảnh và lưu vào bảng Booking_Documents
            $documentsToUpload = ['cccd_front', 'cccd_back'];
            if ($request->service_type === 'self_drive') {
                $documentsToUpload[] = 'gplx'; // Thêm GPLX nếu tự lái
            }

            foreach ($documentsToUpload as $docType) {
                if ($request->hasFile($docType)) {
                    // Lưu file vào thư mục storage/app/public/documents
                    $path = $request->file($docType)->store('public/documents');
                    
                    // Sửa lại đường dẫn để hiển thị ra web được
                    $url = str_replace('public/', 'storage/', $path);

                    BookingDocument::create([
                        'booking_id'          => $booking->id,
                        'doc_type'            => $docType,
                        'image_url'           => asset($url), // Hàm asset() tạo link URL tuyệt đối (http://...)
                        'verification_status' => 'pending'
                    ]);
                }
            }

            DB::commit(); // Mọi thứ hoàn hảo, xác nhận lưu vĩnh viễn vào DB!

            return response()->json([
                'status'  => 'success',
                'message' => 'Gửi yêu cầu đặt xe thành công. Đang chờ Chủ xe duyệt.',
                'data'    => $booking->load('documents') // Trả về Booking kèm theo link ảnh
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); // Lỗi ở đâu đó? Quay ngược toàn bộ quá trình, không lưu rác vào DB!
            
            return response()->json([
                'status'  => 'error',
                'message' => 'Đã xảy ra lỗi hệ thống: ' . $e->getMessage()
            ], 500);
        }
    }
}