<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consignment;
use Illuminate\Http\Request;

class ConsignmentController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if (!$user) {
        $items = Consignment::with('user')->latest()->get();
    } elseif ($user->role === 'admin') {
        $items = Consignment::with('user')->latest()->get();
    } else {
        $items = Consignment::with('user')
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }

    return response()->json([
        'message' => 'Lấy danh sách ký gửi thành công',
        'data' => $items
    ]);
}

    public function store(Request $request)
{
    $validated = $request->validate([
        'user_id' => 'nullable|exists:users,id',
        'car_name' => 'required|string|max:255',
        'brand' => 'nullable|string|max:255',
        'plate_number' => 'nullable|string|max:255',
        'seats' => 'nullable|integer|min:1',
        'transmission' => 'nullable|string|max:255',
        'fuel' => 'nullable|string|max:255',
        'price_per_day' => 'nullable|integer|min:0',
        'image_url' => 'nullable|string',
    ]);

    $validated['status'] = 'pending';

    if (!isset($validated['user_id'])) {
        $validated['user_id'] = 1;
    }

    $consignment = Consignment::create($validated);

    return response()->json([
        'message' => 'Gửi ký gửi xe thành công',
        'data' => $consignment
    ], 201);
}

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Bạn không có quyền thực hiện chức năng này'
            ], 403);
        }

        $item = Consignment::findOrFail($id);
        $item->status = $request->status;
        $item->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái ký gửi thành công',
            'data' => $item
        ]);
    }
}