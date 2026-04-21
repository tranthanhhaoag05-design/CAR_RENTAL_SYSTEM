import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { useState } from "react";
import { addConsignment } from "../data/orderDB";

export default function ConsignmentPage() {
  const [form, setForm] = useState({
    brand: "Hãng xe",
    model: "Mẫu xe",
    year: "2026",
    city: "Hồ Chí Minh",
    rentalDays: "Chủ yếu cho thuê",
    price: "",
    seats: "4",
    transmission: "Số tự động",
    fuel: "Xăng",
    image: "",
  });

  const [popup, setPopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    note: "",
  });

  const handleSubmitConsignment = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!currentUser) {
      setPopup({
        open: true,
        type: "error",
        title: "Chưa đăng nhập",
        message: "Bạn cần đăng nhập để ký gửi xe.",
        note: "Vui lòng đăng nhập rồi gửi lại thông tin xe.",
      });
      return;
    }

    if (
      !form.brand ||
      form.brand === "Hãng xe" ||
      !form.model ||
      form.model === "Mẫu xe" ||
      !form.price ||
      !form.seats ||
      !form.transmission ||
      !form.fuel
    ) {
      setPopup({
        open: true,
        type: "info",
        title: "Thiếu thông tin",
        message: "Vui lòng nhập đầy đủ thông tin xe.",
        note: "Hãy kiểm tra lại các trường bắt buộc trước khi tiếp tục.",
      });
      return;
    }

    addConsignment({
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      brand: form.brand,
      model: form.model,
      year: form.year,
      city: form.city,
      rentalDays: form.rentalDays,
      price: Number(form.price),
      seats: Number(form.seats),
      transmission: form.transmission,
      fuel: form.fuel,
      image: form.image,
      status: "pending",
    });

    setPopup({
      open: true,
      type: "success",
      title: "Ký gửi thành công",
      message: "Đăng ký ký gửi xe thành công. Vui lòng chờ admin xét duyệt.",
      note: "GoDriver sẽ thông báo cho bạn khi xe của bạn được duyệt.",
    });

    setForm({
      brand: "Hãng xe",
      model: "Mẫu xe",
      year: "2026",
      city: "Hồ Chí Minh",
      rentalDays: "Chủ yếu cho thuê",
      price: "",
      seats: "4",
      transmission: "Số tự động",
      fuel: "Xăng",
      image: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="consign-hero">
        <div className="container consign-hero-grid">
          <div className="consign-form-wrap">
            <h1>Cho thuê xe dễ dàng, thu nhập ổn định cùng GoDriver</h1>
            <p>Ước tính thu nhập từ xe của bạn</p>

            <div className="consign-form-grid">
              <div className="consign-field">
                <label>Hãng xe</label>
                <select
                  value={form.brand}
                  onChange={(e) =>
                    setForm({ ...form, brand: e.target.value })
                  }
                >
                  <option>Hãng xe</option>
                  <option>Toyota</option>
                  <option>Hyundai</option>
                  <option>Kia</option>
                  <option>Mazda</option>
                  <option>VinFast</option>
                </select>
              </div>

              <div className="consign-field">
                <label>Mẫu xe</label>
                <select
                  value={form.model}
                  onChange={(e) =>
                    setForm({ ...form, model: e.target.value })
                  }
                >
                  <option>Mẫu xe</option>
                  <option>Accent</option>
                  <option>Vios</option>
                  <option>CX-5</option>
                  <option>VF7</option>
                </select>
              </div>

              <div className="consign-field">
                <label>Năm sản xuất</label>
                <select
                  value={form.year}
                  onChange={(e) =>
                    setForm({ ...form, year: e.target.value })
                  }
                >
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
            </div>

            <div className="consign-field">
              <label>Thành phố</label>
              <select
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              >
                <option>Hồ Chí Minh</option>
                <option>Bình Dương</option>
                <option>Đồng Nai</option>
              </select>
            </div>

            <div className="consign-field">
              <label>Số ngày có thể cho thuê</label>
              <select
                value={form.rentalDays}
                onChange={(e) =>
                  setForm({ ...form, rentalDays: e.target.value })
                }
              >
                <option>Chủ yếu cho thuê</option>
                <option>10 ngày</option>
                <option>20 ngày</option>
              </select>
            </div>

            <div className="consign-field">
              <label>Giá cho thuê / ngày</label>
              <input
                type="number"
                placeholder="Ví dụ: 800000"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div className="consign-field">
              <label>Số ghế</label>
              <input
                type="number"
                placeholder="Ví dụ: 4"
                value={form.seats}
                onChange={(e) =>
                  setForm({ ...form, seats: e.target.value })
                }
              />
            </div>

            <div className="consign-field">
              <label>Hộp số</label>
              <select
                value={form.transmission}
                onChange={(e) =>
                  setForm({ ...form, transmission: e.target.value })
                }
              >
                <option>Số tự động</option>
                <option>Số sàn</option>
              </select>
            </div>

            <div className="consign-field">
              <label>Nhiên liệu</label>
              <select
                value={form.fuel}
                onChange={(e) =>
                  setForm({ ...form, fuel: e.target.value })
                }
              >
                <option>Xăng</option>
                <option>Dầu</option>
                <option>Điện</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="consign-field">
              <label>Link ảnh xe</label>
              <input
                type="text"
                placeholder="Dán link ảnh xe vào đây"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />
            </div>

            <div className="consign-note">
              Hãy điền thông tin để ước tính thu nhập
            </div>

            <button
              className="consign-main-btn"
              onClick={handleSubmitConsignment}
            >
              Đăng ký ngay
            </button>
          </div>

          <div className="consign-hero-image">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="consign-steps">
        <div className="container">
          <h2>Cho thuê xe chỉ với 3 bước đơn giản</h2>

          <div className="consign-steps-line">
            <div className="consign-step-dot">1</div>
            <div className="consign-step-dot">2</div>
            <div className="consign-step-dot">3</div>
          </div>

          <div className="consign-steps-grid">
            <div className="consign-step-card">
              <h3>Đăng ký xe nhanh chóng</h3>
              <p>Chỉ cần vài bước để đưa xe của bạn lên hệ thống</p>
            </div>

            <div className="consign-step-card">
              <h3>Cho thuê dễ dàng</h3>
              <p>GoDriver hỗ trợ tìm khách và quản lý đơn thuê</p>
            </div>

            <div className="consign-step-card">
              <h3>Nhận thu nhập đều đặn</h3>
              <p>Thanh toán minh bạch và nhanh chóng mỗi tuần</p>
            </div>
          </div>
        </div>
      </section>

      <section className="consign-support">
        <div className="container consign-support-grid">
          <div className="consign-support-text">
            <h2>GoDriver hỗ trợ bạn toàn diện</h2>
            <p>
              Bạn chỉ cần đăng ký xe, GoDriver sẽ lo phần còn lại: tìm khách,
              kiểm tra hồ sơ, xử lý hợp đồng và hỗ trợ trong suốt quá trình thuê.
            </p>
          </div>

          <div className="consign-support-box">
            <h3>GoDriver đảm nhận</h3>
            <p>
              Lọc khách, xác thực thông tin và đảm bảo an toàn cho chủ xe.
            </p>
          </div>
        </div>
      </section>

      <section className="consign-tech">
        <div className="container">
          <h2>Công nghệ bảo vệ xe thông minh</h2>

          <div className="consign-tech-grid">
            <div className="consign-tech-card">
              <p>Chống trộm hiệu quả</p>
            </div>

            <div className="consign-tech-card">
              <p>Theo dõi vị trí xe 24/7</p>
            </div>

            <div className="consign-tech-card">
              <p>Quản lý dễ dàng</p>
            </div>

            <div className="consign-tech-card">
              <p>Cảnh báo rủi ro sớm</p>
            </div>
          </div>
        </div>
      </section>

      <section className="consign-compare">
        <div className="container">
          <h2>GoDriver – Giải pháp tối ưu cho thuê xe</h2>

          <div className="consign-table">
            <div className="consign-row consign-head">
              <div></div>
              <div>GoDriver</div>
              <div>Tự làm</div>
              <div>Khác</div>
            </div>

            <div className="consign-row">
              <div>Tiết kiệm thời gian</div>
              <div>✓</div>
              <div>✕</div>
              <div>✕</div>
            </div>

            <div className="consign-row">
              <div>Quản lý rủi ro</div>
              <div>✓</div>
              <div>✕</div>
              <div>✕</div>
            </div>

            <div className="consign-row">
              <div>Hỗ trợ 24/7</div>
              <div>✓</div>
              <div>✕</div>
              <div>✕</div>
            </div>
          </div>
        </div>
      </section>

      {popup.open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setPopup((prev) => ({ ...prev, open: false }))}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#fff",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              display: "grid",
              gridTemplateColumns: "110px 1fr",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background:
                  popup.type === "success"
                    ? "linear-gradient(180deg, #34d399, #16a34a)"
                    : popup.type === "error"
                    ? "linear-gradient(180deg, #fb7185, #ef4444)"
                    : "linear-gradient(180deg, #60a5fa, #2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "42px",
                fontWeight: "800",
              }}
            >
              {popup.type === "success"
                ? "✓"
                : popup.type === "error"
                ? "!"
                : "i"}
            </div>

            <div style={{ padding: "28px 24px 22px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                {popup.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "17px",
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                {popup.message}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  background: "#f8fafc",
                  border: "1px solid #dbeafe",
                  color: "#475569",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                {popup.note}
              </div>

              <div
                style={{
                  marginTop: "22px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() =>
                    setPopup((prev) => ({ ...prev, open: false }))
                  }
                  style={{
                    minWidth: "110px",
                    border: "none",
                    borderRadius: "14px",
                    padding: "12px 20px",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    cursor: "pointer",
                    background:
                      popup.type === "success"
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : popup.type === "error"
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}