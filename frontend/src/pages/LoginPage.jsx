import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const normalizePhone = (value) => value.replace(/\s+/g, '');

  const isValidVietnamPhone = (value) => {
    const phone = normalizePhone(value);
    return /^(0[3|5|7|8|9][0-9]{8})$/.test(phone);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!isValidVietnamPhone(phone)) {
      setMessage('Số điện thoại Việt Nam không hợp lệ');
      setMessageType('error');
      return;
    }

    if (!password.trim()) {
      setMessage('Vui lòng nhập mật khẩu');
      setMessageType('error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (user) =>
        user.phone === normalizePhone(phone) && user.password === password
    );

    if (!foundUser) {
      setMessage('Sai số điện thoại hoặc mật khẩu');
      setMessageType('error');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    setMessage('Đăng nhập thành công');
    setMessageType('success');

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 700);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!isValidVietnamPhone(phone)) {
      setMessage('Số điện thoại Việt Nam không hợp lệ');
      setMessageType('error');
      return;
    }

    if (!password.trim()) {
      setMessage('Vui lòng nhập mật khẩu');
      setMessageType('error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const phoneNormalized = normalizePhone(phone);

    const existed = users.find((user) => user.phone === phoneNormalized);

    if (existed) {
      setMessage('Tài khoản đã tồn tại');
      setMessageType('error');
      return;
    }

    const newUser = {
      phone: phoneNormalized,
      password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Đăng ký thành công, bạn có thể đăng nhập');
    setMessageType('success');

    setMode('login');
    setPassword('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!isValidVietnamPhone(phone)) {
      setMessage('Số điện thoại Việt Nam không hợp lệ');
      setMessageType('error');
      return;
    }

    if (!newPassword.trim()) {
      setMessage('Vui lòng nhập mật khẩu mới');
      setMessageType('error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const phoneNormalized = normalizePhone(phone);

    const userIndex = users.findIndex((user) => user.phone === phoneNormalized);

    if (userIndex === -1) {
      setMessage('Số điện thoại chưa được đăng ký');
      setMessageType('error');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Đổi mật khẩu thành công, hãy đăng nhập lại');
    setMessageType('success');

    setMode('login');
    setPassword('');
    setNewPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-box phone-login-box">
        <div className="phone-login-icon-wrap">
          <div className="phone-login-icon">🛡</div>
        </div>

        <div className="login-header phone-login-header">
          <h1>
            {mode === 'login'
              ? 'Đăng nhập'
              : mode === 'register'
              ? 'Đăng ký'
              : 'Quên mật khẩu'}
          </h1>
          <p>
            {mode === 'login' &&
              'Nhập số điện thoại và mật khẩu để tiếp tục'}
            {mode === 'register' &&
              'Tạo tài khoản mới bằng số điện thoại Việt Nam'}
            {mode === 'forgot' &&
              'Nhập số điện thoại và mật khẩu mới để lấy lại tài khoản'}
          </p>
        </div>

        {mode === 'login' && (
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
              <p className={`auth-message ${messageType === 'success' ? 'success' : 'error'}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => navigate('/')}
              >
                Hủy
              </button>
              <button type="submit" className="phone-submit-btn">
                Tiếp tục
              </button>
            </div>

            <div className="auth-extra-links">
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode('register');
                  setMessage('');
                  setMessageType('');
                  setPassword('');
                }}
              >
                Đăng ký
              </button>

              <span className="auth-divider">|</span>

              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode('forgot');
                  setMessage('');
                  setMessageType('');
                  setPassword('');
                }}
              >
                Quên mật khẩu
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form className="login-form phone-login-form" onSubmit={handleRegister}>
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
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <p className={`auth-message ${messageType === 'success' ? 'success' : 'error'}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => {
                  setMode('login');
                  setMessage('');
                  setMessageType('');
                  setPassword('');
                }}
              >
                Quay lại
              </button>
              <button type="submit" className="phone-submit-btn">
                Đăng ký
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
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
              <p className={`auth-message ${messageType === 'success' ? 'success' : 'error'}`}>
                {message}
              </p>
            )}

            <div className="phone-login-actions">
              <button
                type="button"
                className="phone-cancel-btn"
                onClick={() => {
                  setMode('login');
                  setMessage('');
                  setMessageType('');
                  setNewPassword('');
                }}
              >
                Quay lại
              </button>
              <button type="submit" className="phone-submit-btn">
                Đổi mật khẩu
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}