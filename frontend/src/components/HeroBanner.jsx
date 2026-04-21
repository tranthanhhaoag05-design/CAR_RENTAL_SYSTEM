import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";

export default function HeroBanner({ banners = [] }) {
  const navigate = useNavigate();

  const getToday = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const getReturnDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: getToday(),
    pickupTime: getCurrentTime(),
    returnDate: getReturnDate(),
    returnTime: "23:00",
  });

  const currentBanner =
    banners.length > 0
      ? banners[currentBannerIndex]
      : {
          title: "GoDriver - Đồng hành mọi hành trình",
          subtitle: "Nhiều mẫu xe đẹp, hiện đại, phù hợp mọi nhu cầu",
          image:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
        };

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const sliderTimer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(sliderTimer);
  }, [banners]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchData((prev) => ({
        ...prev,
        pickupTime: prev.pickupTime || getCurrentTime(),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleApplySearch = (form) => {
    setSearchData(form);
    setIsModalOpen(false);

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    navigate("/thue-xe", {
      state: {
        selectedArea: form.location,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
        returnDate: form.returnDate,
        returnTime: form.returnTime,
      },
    });
  };

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `url(${currentBanner.image})` }}
      >
        <div className="hero-overlay">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>{currentBanner.title}</h1>
              <p>{currentBanner.subtitle}</p>
            </div>

            {banners.length > 1 && (
              <div className="hero-dots">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`dot ${
                      index === currentBannerIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentBannerIndex(index)}
                    aria-label={`Chuyển tới banner ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="search-bar">
              <button
                type="button"
                className="search-item search-clickable"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Khu vực nhận xe</span>
                <strong>{searchData.location || "Chọn khu vực tìm xe"}</strong>
              </button>

              <button
                type="button"
                className="search-item search-clickable"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Ngày nhận xe</span>
                <strong>{formatDate(searchData.pickupDate)}</strong>
              </button>

              <button
                type="button"
                className="search-item search-clickable"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Giờ nhận xe</span>
                <strong>{searchData.pickupTime}</strong>
              </button>

              <button
                type="button"
                className="search-item search-clickable"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Ngày trả xe</span>
                <strong>{formatDate(searchData.returnDate)}</strong>
              </button>

              <button
                type="button"
                className="search-item search-clickable"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Giờ trả xe</span>
                <strong>{searchData.returnTime}</strong>
              </button>

              <button
                type="button"
                className="search-button"
                onClick={() => setIsModalOpen(true)}
              >
                TÌM XE
              </button>
            </div>
          </div>
        </div>
      </section>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchData={searchData}
        onApply={handleApplySearch}
      />

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
              Bạn vẫn có thể xem xe theo khu vực, nhưng cần đăng nhập để tiến
              hành thuê xe.
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
    </>
  );
}