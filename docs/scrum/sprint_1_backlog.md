# Kế hoạch Sprint 1: Xây dựng Nền tảng & Phân tích Yêu cầu
**Thời gian:** (Điền ngày bắt đầu - ngày kết thúc)
**Mục tiêu:** Xây dựng khung kiến trúc phần mềm, CSDL cốt lõi và các biểu đồ mô hình hóa ban đầu cho Tiểu luận.

## Phân công nhiệm vụ (Task list)

### 1. Trần Thanh Hào (Scrum Master & Backend)
- [x] Khởi tạo cấu trúc thư mục Frontend (React) và Backend (Laravel).
- [x] Setup repository, cấu hình file `.gitignore` và phân quyền GitHub cho nhóm.
- [ ] Thiết lập kết nối CSDL và cấu hình bảo mật JWT trong file `.env`.
- [ ] Viết API cơ bản: Lấy danh sách xe (`GET /api/cars`).

### 2. Đặng Lâm Gia Bảo (Database)
- [x] Thiết kế sơ đồ thực thể mối quan hệ (ERD) bằng PlantUML.
- [ ] Viết code Migration để tạo 4 bảng chính: `users`, `cars`, `drivers`, `bookings`.
- [ ] Viết code Seeder để tạo dữ liệu mẫu (ví dụ: 5 xe, 3 tài xế sẵn sàng).

### 3. Tuấn Anh (Frontend)
- [ ] Clone code từ GitHub về máy cá nhân và chạy thử `npm run dev`.
- [ ] Thiết kế kiến trúc Component chung: Navbar, Footer, Layout chính.
- [ ] Dựng giao diện trang chủ hiển thị danh sách xe (nhận dữ liệu tĩnh trước khi gọi API).

### 4. Hảo (Support & Docs)
- [ ] Đọc file `user_stories.md`, sử dụng công cụ (PlantUML/Draw.io) để vẽ **Biểu đồ Use Case (Use Case Diagram)** tổng thể.
- [ ] Tạo file Word Tiểu luận dùng chung, lập dàn ý Chương 1 và Chương 2 theo cấu trúc 6 bước SDLC.