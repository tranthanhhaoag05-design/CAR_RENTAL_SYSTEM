import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  const maskPhone = (phone) => {
    if (!phone) return "";
    return `${phone.slice(0, 3)}xxxxxxx`;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="logo">
          <div className="logo-icon">G</div>
          <span>GoDriver</span>
        </div>

        <nav className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/thue-xe">Thuê xe</Link>
          <Link to="/">Dịch vụ</Link>
          <Link to="/">Liên hệ</Link>
        </nav>

        <div className="nav-auth">
          {currentUser ? (
           <div className="user-box">
  <span className="user-phone">
    {maskPhone(currentUser.phone)}
  </span>

  <button className="logout-btn" onClick={handleLogout}>
    Đăng xuất
  </button>
</div>
          ) : (
            <Link to="/dang-nhap" className="login-btn">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}