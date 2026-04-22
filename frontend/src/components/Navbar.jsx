import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutApi } from "../services/authService";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast.show]);

  const isAdmin = currentUser?.role === "admin";

  const maskPhone = (phone) => {
    if (!phone) return "";
    return `${phone.slice(0, 3)}xxxxxxx`;
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await logoutApi(token);
      }
    } catch (error) {
      // vẫn xóa local nếu API logout lỗi
    } finally {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("access_token");
      setCurrentUser(null);
      navigate("/");
      window.location.reload();
    }
  };

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const handleCopyZalo = async () => {
    try {
      await navigator.clipboard.writeText("0375248772");
      showToast("Đã copy số Zalo: 0375248772", "success");
    } catch (error) {
      showToast("Không thể copy. Vui lòng thử lại.", "error");
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo">
            <div className="logo-icon">G</div>
            <span>GoDriver</span>
          </div>

          <nav className="nav-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/thue-xe">Thuê xe</Link>
            <Link to="/ky-gui-xe">Ký gửi xe</Link>

            {currentUser && !isAdmin && (
              <Link to="/lich-su-dat-xe">Lịch sử đặt xe</Link>
            )}

            {isAdmin && <Link to="/admin">Admin</Link>}

            <span
              onClick={() => setShowContact(true)}
              style={{ cursor: "pointer" }}
            >
              Liên hệ
            </span>
          </nav>

          <div className="nav-auth">
            {currentUser ? (
              <div className="user-box">
                <span className="user-phone">
                  {maskPhone(currentUser.phone)}
                </span>

                {!isAdmin && (
                  <Link to="/lich-su-dat-xe" className="history-btn">
                    Xem lịch sử
                  </Link>
                )}

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

      {showContact && (
        <div
          className="contact-overlay"
          onClick={() => setShowContact(false)}
        >
          <div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="contact-close"
              onClick={() => setShowContact(false)}
            >
              ×
            </button>

            <h2>Liên hệ chủ shop</h2>

            <div className="contact-item">
              <span>Facebook</span>
              <button
                className="contact-btn facebook-btn"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/tuananh.nguyenmau.98",
                    "_blank"
                  )
                }
              >
                Mở Facebook
              </button>
            </div>

            <div className="contact-item">
              <span>Zalo</span>
              <button
                className="contact-btn zalo-btn"
                onClick={handleCopyZalo}
              >
                Copy số
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`custom-toast ${toast.type}`}>
          <div className="custom-toast-icon">
            {toast.type === "success" ? "✓" : "!"}
          </div>
          <div className="custom-toast-content">
            <strong>
              {toast.type === "success" ? "Thành công" : "Thông báo"}
            </strong>
            <p>{toast.message}</p>
          </div>
          <button
            className="custom-toast-close"
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}