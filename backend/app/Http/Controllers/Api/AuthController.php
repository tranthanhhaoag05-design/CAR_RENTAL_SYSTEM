<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ==========================================
    // 1. ĐĂNG KÝ (REGISTER)
    // ==========================================
    public function register(Request $request)
    {
        // 1. Kiểm tra dữ liệu Tuấn Anh gửi lên
        $request->validate([
            'full_name'    => 'required|string|max:255',
            'phone_number' => 'required|string|unique:users,phone_number', // Đảm bảo SĐT chưa ai đăng ký
            'password'     => 'required|string|min:6', // Mật khẩu ít nhất 6 ký tự
        ]);

        // 2. Lưu vào Database
        $user = User::create([
            'full_name'     => $request->full_name,
            'phone_number'  => $request->phone_number,
            'password_hash' => Hash::make($request->password), // Mã hóa mật khẩu
            'role'          => 'customer', // Mặc định ai đăng ký cũng là khách hàng
            'is_active'     => true
        ]);

        // 3. Tạo chìa khóa (Token) Sanctum cho User này
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4. Trả kết quả về cho Frontend
        return response()->json([
            'status'       => 'success',
            'message'      => 'Đăng ký tài khoản thành công!',
            'data'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }

    // ==========================================
    // 2. ĐĂNG NHẬP (LOGIN)
    // ==========================================
    public function login(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string',
            'password'     => 'required|string',
        ]);

        // Tìm user theo số điện thoại
        $user = User::where('phone_number', $request->phone_number)->first();

        // Kiểm tra xem User có tồn tại không VÀ mật khẩu có khớp không
        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Số điện thoại hoặc mật khẩu không chính xác!'
            ], 401);
        }

        // Nếu user bị khóa tài khoản
        if (!$user->is_active) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Tài khoản của bạn đã bị khóa.'
            ], 403);
        }

        // Tạo Token đăng nhập
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'       => 'success',
            'message'      => 'Đăng nhập thành công!',
            'data'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    // ==========================================
    // 3. ĐĂNG XUẤT (LOGOUT)
    // ==========================================
    public function logout(Request $request)
    {
        // Thu hồi (xóa) token hiện tại mà user đang sử dụng
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Đã đăng xuất thành công!'
        ]);
    }
}