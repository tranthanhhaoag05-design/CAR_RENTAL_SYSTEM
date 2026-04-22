import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizePhone = (value) => value.replace(/\s+/g, "");

  const isValidVietnamPhone = (value) => {
    const normalized = normalizePhone(value);
    return /^(0[3|5|7|8|9][0-9]{8})$/.test(normalized);
  };

  const resetMessage = () => {
    setMessage("");
    setMessageType("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessage();

    if (!isValidVietnamPhone(phone)) {
      setMessage("Số điện thoại Việt Nam không hợp lệ");
      setMessageType("error");
      return;
    }

    if (!password.trim()) {
      setMessage("Vui lòng nhập mật khẩu");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const result = await loginApi({
        phone_number: normalizePhone(phone),
        password,
      });

      const user = result?.data;
      const token = result?.access_token;

      if (!user || !token) {
        setMessage("Dữ liệu đăng nhập trả về không hợp lệ");
        setMessageType("error");
        return;
      }

      const currentUser = {
        id: user.id,
        name: user.full_name,
        phone: user.phone_number,
        role: user.role === "customer" ? "user" : user.role,
        is_active: user.is_active,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("access_token", token);

      setMessage(result?.message || "Đăng nhập thành công");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 700);
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message || "Sai số điện thoại hoặc mật khẩu";
      setMessage(apiMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetMessage();

    if (!fullName.trim()) {
      setMessage("Vui lòng nhập họ tên");
      setMessageType("error");
      return;
    }

    if (!isValidVietnamPhone(phone)) {
      setMessage("Số điện thoại Việt Nam không hợp lệ");
      setMessageType("error");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const result = await registerApi({
        full_name: fullName.trim(),
        phone_number: normalizePhone(phone),
        password,
      });

      setMessage(result?.message || "Đăng ký thành công, bạn có thể đăng nhập");
      setMessageType("success");

      setMode("login");
      setPassword("");
      setNewPassword("");
      setFullName("");
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message || "Đăng ký thất bại";
      setMessage(apiMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    resetMessage();
    setMessage("Backend hiện chưa có API quên mật khẩu.");
    setMessageType("error");
  };

  return (
    <div className="login-page">
      <div className="login-box phone-login-box">
        <div className="phone-login-icon-wrap">
          <div className="phone-login-icon">🛡</div>
        </div>

        <div className="login-header phone-login-header">
          <h1>
            {mode === "login"
              ? "Đăng nhập"
              : mode === "register"
              ? "Đăng ký"
              : "Quên mật khẩu"}
          </h1>
          <p>
            {mode === "login" &&
              "Nhập số điện thoại và mật khẩu để tiếp tục"}
            {mode === "register" &&
              "Tạo tài khoản mới bằng số điện thoại Việt Nam"}
            {mode === "forgot" &&
              "Tính năng quên mật khẩu sẽ dùng khi backend có API tương ứng"}
          </p>
        </div>

        {mode === "login" && (
          <form className="login-form phone-login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                type="text"
                placeholder="VD: 0901 234 567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <p className={`auth-message ${messageType === "success" ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Hủy
              </button>
              <button type="submit" className="phone-submit-btn" disabled={loading}>
                {loading ? "Đang xử lý..." : "Tiếp tục"}
              </button>
            </div>

            <div className="auth-extra-links">
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode("register");
                  resetMessage();
                  setPassword("");
                }}
              >
                Đăng ký
              </button>

              <span className="auth-divider">|</span>

              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode("forgot");
                  resetMessage();
                  setPassword("");
                }}
              >
                Quên mật khẩu
              </button>
            </div>
          </form>
        )}

        {mode === "register" && (
          <form className="login-form phone-login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-phone">Số điện thoại</label>
              <input
                id="register-phone"
                type="text"
                placeholder="VD: 0901 234 567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Mật khẩu</label>
              <input
                id="register-password"
                type="password"
                placeholder="Ít nhất 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <p className={`auth-message ${messageType === "success" ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => {
                  setMode("login");
                  resetMessage();
                }}
                disabled={loading}
              >
                Quay lại
              </button>
              <button type="submit" className="phone-submit-btn" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </div>
          </form>
        )}

        {mode === "forgot" && (
          <form className="login-form phone-login-form" onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label htmlFor="forgot-phone">Số điện thoại</label>
              <input
                id="forgot-phone"
                type="text"
                placeholder="VD: 0901 234 567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-password">Mật khẩu mới</label>
              <input
                id="new-password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {message && (
              <p className={`auth-message ${messageType === "success" ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => {
                  setMode("login");
                  resetMessage();
                }}
              >
                Quay lại
              </button>
              <button type="submit" className="phone-submit-btn">
                Xác nhận
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}