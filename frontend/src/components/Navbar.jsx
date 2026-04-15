export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="logo">
          <div className="logo-icon">G</div>
          <span>GoDriver</span>
        </div>

        <nav className="nav-links">
          <a href="/">Trang chủ</a>
          <a href="/">Thuê xe</a>
          <a href="/">Dịch vụ</a>
          <a href="/">Liên hệ</a>
        </nav>

        <button className="login-btn">Đăng nhập</button>
      </div>
    </header>
  );
}