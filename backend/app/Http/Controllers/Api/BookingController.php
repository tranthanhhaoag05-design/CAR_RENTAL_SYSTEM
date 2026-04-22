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
        $validated = $request->validate([
            'vehicle_id'   => 'required|exists:cars,id',
            'start_date'   => 'required|date|after_or_equal:today',
            'end_date'     => 'required|date|after:start_date',
            'service_type' => 'required|in:self_drive,with_driver',

            'total_price'    => 'nullable|numeric|min:0',
            'deposit_amount' => 'nullable|numeric|min:0',
            'payment_status' => 'nullable|string',
            'status'         => 'nullable|string',

            'cccd_front' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'cccd_back'  => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'gplx'       => 'required_if:service_type,self_drive|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $userId = $request->user()->id;

            $booking = Booking::create([
                'customer_id'    => $userId,
                'driver_id'      => null,
                'vehicle_id'     => $validated['vehicle_id'],
                'start_date'     => $validated['start_date'],
                'end_date'       => $validated['end_date'],
                'service_type'   => $validated['service_type'],
                'status'         => $validated['status'] ?? 'pending',
                'total_price'    => $validated['total_price'] ?? 0,
                'deposit_amount' => $validated['deposit_amount'] ?? 0,
                'payment_status' => $validated['payment_status'] ?? 'unpaid',
            ]);

            $documentsToUpload = [
                'cccd_front' => 'cccd_front',
                'cccd_back'  => 'cccd_back',
            ];

            if ($validated['service_type'] === 'self_drive') {
                $documentsToUpload['gplx'] = 'driving_license';
            }

            foreach ($documentsToUpload as $inputName => $documentType) {
                if ($request->hasFile($inputName)) {
                    $path = $request->file($inputName)->store('public/documents');
                    $url = str_replace('public/', 'storage/', $path);

                    BookingDocument::create([
                        'booking_id'    => $booking->id,
                        'document_type' => $documentType,
                        'file_url'      => asset($url),
                        'status'        => 'pending',
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'status'  => 'success',
                'message' => 'Gửi yêu cầu đặt xe thành công. Đang chờ duyệt.',
                'data'    => $booking->load(['vehicle', 'documents'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status'  => 'error',
                'message' => 'Đã xảy ra lỗi hệ thống: ' . $e->getMessage()
            ], 500);
        }
    }

    public function myBookings(Request $request)
    {
        $userId = $request->user()->id;

        $bookings = Booking::with(['vehicle', 'documents'])
            ->where('customer_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $bookings
        ]);
    }

    public function index(Request $request)
    {
        $bookings = Booking::with(['customer', 'vehicle', 'documents'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $bookings
        ]);
    }
}