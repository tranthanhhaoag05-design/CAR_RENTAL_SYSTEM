import { useEffect, useMemo, useState } from "react";
import { getVehicles } from "../services/vehicleService";
import { mapVehicleFromApi } from "../utils/mapVehicleFromApi";

export default function SearchModal({
  isOpen,
  onClose,
  searchData,
  onApply,
}) {
  const [form, setForm] = useState(searchData);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getVehicles();
        setCars(data.map(mapVehicleFromApi));
      } catch (error) {
        console.error("Lỗi lấy xe trong SearchModal:", error);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  const areaOptions = useMemo(() => {
    return [...new Set(cars.map((car) => car.location).filter(Boolean))];
  }, [cars]);

  useEffect(() => {
    setForm(searchData);
  }, [searchData]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateDuration = () => {
    try {
      const start = new Date(`${form.pickupDate}T${form.pickupTime}`);
      const end = new Date(`${form.returnDate}T${form.returnTime}`);

      if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
        return "Thời gian không hợp lệ";
      }

      const diffMs = end - start;
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;

      if (days > 0 && hours > 0) return `${days} ngày ${hours} giờ`;
      if (days > 0) return `${days} ngày`;
      return `${hours} giờ`;
    } catch {
      return "Thời gian không hợp lệ";
    }
  };

  const handleSubmit = () => {
    onApply(form);
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <button className="search-modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="search-modal-title">Tìm xe</h2>

        <div className="search-modal-form">
          <div className="search-modal-field full">
            <label>Khu vực</label>
            <select
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="search-modal-select"
            >
              <option value="">Chọn khu vực tìm xe</option>
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="search-modal-grid">
            <div className="search-modal-field">
              <label>Ngày nhận xe</label>
              <input
                type="date"
                value={form.pickupDate}
                onChange={(e) => handleChange("pickupDate", e.target.value)}
              />
            </div>

            <div className="search-modal-field">
              <label>Giờ nhận xe</label>
              <input
                type="time"
                value={form.pickupTime}
                onChange={(e) => handleChange("pickupTime", e.target.value)}
              />
            </div>

            <div className="search-modal-field">
              <label>Ngày trả xe</label>
              <input
                type="date"
                value={form.returnDate}
                onChange={(e) => handleChange("returnDate", e.target.value)}
              />
            </div>

            <div className="search-modal-field">
              <label>Giờ trả xe</label>
              <input
                type="time"
                value={form.returnTime}
                onChange={(e) => handleChange("returnTime", e.target.value)}
              />
            </div>
          </div>

          <div className="search-modal-duration">
            <span>Thời gian thuê</span>
            <strong>{calculateDuration()}</strong>
          </div>

          <div className="search-modal-warning">
            Khung giờ buổi khuya (23:00 tới 7:00) có thể có ít lựa chọn xe hơn
            so với các khung giờ khác.
          </div>

          <div className="search-modal-warning">
            Đây là chuyến đặt sát giờ. Để xe được chuẩn bị tốt và vệ sinh chu đáo,
            vui lòng đặt trước 2 tiếng.
          </div>

          <div className="search-modal-footer-text">
            Tiết kiệm đến 50% nếu chọn 4h, 8h, 12h, 24h bắt đầu từ lúc nhận xe,
            nhận và trả xe 24/24
          </div>

          <button className="search-modal-submit" onClick={handleSubmit}>
            Tìm xe
          </button>
        </div>
      </div>
    </div>
  );
}