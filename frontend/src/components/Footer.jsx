export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-logo">GoDriver</h2>
          <h3>CÔNG TY TNHH GODRIVER VIỆT NAM</h3>
          <p>Mã số thuế: 0318208708. Cấp ngày: 11/12/2023</p>
          <p><strong>Văn phòng Bình Dương</strong></p>
          <p>123 Đại lộ Bình Dương, Phường Phú Hòa, Thành phố Thủ Dầu Một, Bình Dương</p>
          <p><strong>Văn phòng TP. Hồ Chí Minh</strong></p>
          <p>25 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
          <p><strong>Văn phòng Hà Nội</strong></p>
          <p>88 Trần Duy Hưng, Cầu Giấy, Thành phố Hà Nội</p>
          <p>Email: cskh@godriver.vn</p>
        </div>

        <div>
          <h3>Chính sách</h3>
          <p>Điều kiện giao dịch chung</p>
          <p>Chính sách bảo vệ dữ liệu cá nhân</p>
          <p>Điều khoản sử dụng nền tảng</p>
          <p>Chính sách giao nhận xe</p>
          <p>Phương thức thanh toán</p>
          <p>Tuyển dụng</p>
        </div>

        <div>
          <h3>Địa điểm dịch vụ</h3>
          <p>Hồ Chí Minh</p>
          <p>Bình Dương</p>
          <p>Hà Nội</p>
          <p>Đà Lạt</p>
          <p>Đồng Nai</p>
          <p>Cần Thơ</p>

          <h3 className="social-title">Mạng xã hội</h3>
          <div className="social-list">
            <button>Facebook</button>
            <button>Zalo</button>
            <button>TikTok</button>
            <button>YouTube</button>
          </div>
        </div>

        <div>
          <h3>Ứng dụng</h3>
          <div className="app-box">
            <span className="app-icon">G</span>
            <span>Thuê xe</span>
            <button>Tải ngay</button>
          </div>

          <h3>Hỗ trợ</h3>
          <p>Quy định dịch vụ</p>
          <p>Chính sách bảo hiểm</p>
          <p>Hướng dẫn đặt xe</p>
          <p className="hotline">1900 5335</p>
        </div>
      </div>
    </footer>
  );
}