import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addOrder, parsePriceToNumber } from "../data/orderDB";
import SiteFooter from "../components/SiteFooter";
import {
  carsNow,
  suggestCars,
  luxuryCars,
  extraBrandCars,
} from "../data/mockData";

export default function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookingPopup, setBookingPopup] = useState({
    open: false,
    title: "",
    message: "",
    note: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const allCars = useMemo(
    () => [...carsNow, ...suggestCars, ...luxuryCars, ...extraBrandCars],
    []
  );

  const car = allCars.find((item) => String(item.id) === String(id));

  const address =
    car?.address ||
    `Số 299, Đường Cách Mạng Tháng Tám, ${car?.location}, Thành phố Hồ Chí Minh`;

  const gallery = car
    ? car.gallery?.length
      ? car.gallery
      : [car.image, car.image, car.image, car.image, car.image]
    : [];

  const [selectedImage, setSelectedImage] = useState(gallery[0] || "");

  useEffect(() => {
    if (gallery.length > 0) {
      setSelectedImage(gallery[0]);
    }
  }, [id]);

  const handleRentNow = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    addOrder({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      carId: car.id,
      carName: car.name,
      location: car.location,
      priceText: car.priceDay,
      total: parsePriceToNumber(car.priceDay),
      pickupAddress: address,
    });

    setBookingPopup({
      open: true,
      title: "Đặt xe thành công",
      message: "Đơn của bạn đã được tạo. Vui lòng chờ tài xế nhận đơn.",
      note: "Bạn có thể theo dõi trạng thái trong lịch sử đặt xe.",
    });
  };

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: "80px 0" }}>
          <h2>Không tìm thấy xe</h2>
          <p>Xe bạn chọn hiện không tồn tại hoặc đã bị xoá.</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  const description =
    car.description ||
    `${car.name} là mẫu xe phù hợp cho nhu cầu di chuyển trong thành phố lẫn đi chơi ngắn ngày. Xe có thiết kế hiện đại, nội thất gọn gàng, vận hành ổn định và tiết kiệm nhiên liệu. Phù hợp cho khách hàng cần một chiếc xe dễ lái, tiện nghi và linh hoạt trong nhiều tình huống sử dụng.`;

  return (
    <>
      <Navbar />

      <section className="detail-topbar">
        <div className="container detail-topbar-inner">
          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            ← Chi tiết xe
          </button>
        </div>
      </section>

      <section className="car-detail-page">
        <div className="container">
          <div className="detail-gallery">
            <div className="detail-main-image">
              <img src={selectedImage} alt={car.name} />
            </div>

            <div className="detail-thumb-grid">
              {gallery.slice(1, 5).map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className="detail-thumb"
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${car.name} ${index + 2}`} />
                </button>
              ))}

              {gallery.length <= 1 && (
                <>
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="detail-thumb"
                      onClick={() => setSelectedImage(car.image)}
                    >
                      <img src={car.image} alt={`${car.name} ${n}`} />
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="detail-content-grid">
            <div className="detail-main-content">
              <div className="detail-title-row">
                <div>
                  <h1 className="detail-title">{car.name}</h1>
                  <p className="detail-location">📍 {car.location}</p>
                </div>

                <button className="detail-share-btn">Chia sẻ</button>
              </div>

              <div className="detail-divider"></div>

              <section className="detail-section">
                <h2>Đặc điểm</h2>

                <div className="detail-features">
                  <div className="detail-feature-item">
                    <span className="feature-label">Số ghế</span>
                    <strong>{car.seats} chỗ</strong>
                  </div>

                  <div className="detail-feature-item">
                    <span className="feature-label">Truyền động</span>
                    <strong>{car.transmission}</strong>
                  </div>

                  <div className="detail-feature-item">
                    <span className="feature-label">Nhiên liệu</span>
                    <strong>{car.fuel}</strong>
                  </div>

                  <div className="detail-feature-item">
                    <span className="feature-label">Giá theo ngày</span>
                    <strong>{car.priceDay}</strong>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Mô tả</h2>
                <p className="detail-description">{description}</p>
              </section>

              <section className="detail-section">
                <h2>Vị trí xe</h2>
                <p className="detail-address">{address}</p>
              </section>
            </div>

            <aside className="detail-sidebar">
              <div className="pickup-card">
                <h3>Tự nhận xe</h3>
                <ul>
                  <li>Tối ưu chi phí khi thuê gói theo giờ</li>
                  <li>Nhận và trả xe chủ động qua ứng dụng</li>
                  <li>Đặt xe nhanh, không cần chờ duyệt lâu</li>
                </ul>
              </div>

              <div className="booking-card">
                <div className="booking-price-row">
                  <div className="booking-main-price">{car.priceHour}</div>
                  <div className="booking-sub-price">{car.priceDay}</div>
                </div>

                <p className="booking-note">
                  Giá có thể thay đổi vào cuối tuần, lễ hoặc theo thời điểm.
                </p>

                <div className="booking-time-box">
                  <label>Thời gian thuê</label>
                  <div className="booking-time-value">
                    07:00, 22/04/2026 đến 07:00, 24/04/2026
                  </div>
                </div>

                <div className="booking-location-box">
                  <label>Vị trí nhận xe</label>
                  <div className="booking-location-value">{address}</div>
                </div>

                <button className="booking-btn" onClick={handleRentNow}>
                  Đặt xe ngay
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {showLoginModal && (
        <div
          className="login-required-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="login-required-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="login-required-icon">🔒</div>
            <h3>Bạn chưa đăng nhập</h3>
            <p>
              Bạn vẫn có thể xem thông tin xe, nhưng cần đăng nhập để tiến hành
              thuê xe.
            </p>

            <div className="login-required-actions">
              <button
                className="login-required-cancel"
                onClick={() => setShowLoginModal(false)}
              >
                Để sau
              </button>
              <button
                className="login-required-confirm"
                onClick={() => navigate("/dang-nhap")}
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingPopup.open && (
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
          onClick={() => {
            setBookingPopup((prev) => ({ ...prev, open: false }));
            navigate("/lich-su-dat-xe");
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
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
                background: "linear-gradient(180deg, #34d399, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "42px",
                fontWeight: "800",
              }}
            >
              ✓
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
                {bookingPopup.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "17px",
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                {bookingPopup.message}
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
                {bookingPopup.note}
              </div>

              <div
                style={{
                  marginTop: "22px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => {
                    setBookingPopup((prev) => ({ ...prev, open: false }));
                    navigate("/lich-su-dat-xe");
                  }}
                  style={{
                    minWidth: "120px",
                    border: "none",
                    borderRadius: "14px",
                    padding: "12px 20px",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                >
                  Xem lịch sử
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