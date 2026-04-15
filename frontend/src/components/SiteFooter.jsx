export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-logo">GoDriver</div>
          <p className="footer-company">CÔNG TY TNHH GODRIVER VIỆT NAM</p>

          <p>Mã số thuế: 0318208708. Cấp ngày: 11/12/2023</p>

          <p>
            <strong>Văn phòng Bình Dương</strong>
            <br />
            123 Đại lộ Bình Dương, Phường Phú Hòa,
            <br />
            Thành phố Thủ Dầu Một, Bình Dương
          </p>

          <p>
            <strong>Văn phòng TP. Hồ Chí Minh</strong>
            <br />
            25 Nguyễn Huệ, Phường Bến Nghé,
            <br />
            Quận 1, TP. Hồ Chí Minh
          </p>

          <p>
            <strong>Văn phòng Hà Nội</strong>
            <br />
            88 Trần Duy Hưng, Cầu Giấy,
            <br />
            Thành phố Hà Nội
          </p>

          <p>Email: cskh@godriver.vn</p>
        </div>

        <div className="footer-col">
          <h3>Chính sách</h3>
          <ul>
            <li>Điều kiện giao dịch chung</li>
            <li>Chính sách bảo vệ dữ liệu cá nhân</li>
            <li>Điều khoản sử dụng nền tảng</li>
            <li>Chính sách giao nhận xe</li>
            <li>Phương thức thanh toán</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Địa điểm dịch vụ</h3>
          <ul>
            <li>Hồ Chí Minh</li>
            <li>Bình Dương</li>
            <li>Hà Nội</li>
            <li>Đà Lạt</li>
            <li>Đồng Nai</li>
            <li>Cần Thơ</li>
          </ul>

          <h3 className="social-title">Mạng xã hội</h3>
          <div className="footer-socials">
            <span>Facebook</span>
            <span>Zalo</span>
            <span>TikTok</span>
            <span>YouTube</span>
          </div>
        </div>

        <div className="footer-col">
          <h3>Ứng dụng</h3>
          <div className="footer-app-box">
            <div className="app-icon">G</div>
            <span>Thuê xe</span>
            <button>Tải ngay</button>
          </div>
        </div>

        <div className="footer-col">
          <h3>Hỗ trợ</h3>
          <ul>
            <li>Quy định dịch vụ</li>
            <li>Chính sách bảo hiểm</li>
            <li>Hướng dẫn đặt xe</li>
          </ul>

          <p className="footer-hotline">📞 1900 5335</p>
        </div>
      </div>
    </footer>
  );
}