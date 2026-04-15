import { useEffect, useState } from "react";

export default function SearchBar() {
  const [isSticky, setIsSticky] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const pickup = new Date(now);
      const dropoff = new Date(now);
      dropoff.setDate(pickup.getDate() + 2);

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setPickupDate(formatDate(pickup));
      setReturnDate(formatDate(dropoff));
      setPickupTime(formatTime(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={isSticky ? "search-box sticky-search" : "search-box"}>
      <div className="search-item">
        <p>Địa điểm nhận xe</p>
        <button type="button" className="location-btn">
          Chọn địa điểm tìm xe
        </button>
      </div>

      <div className="search-item">
        <p>Ngày nhận xe</p>
        <strong>{pickupDate}</strong>
      </div>

      <div className="search-item">
        <p>Giờ nhận xe</p>
        <strong>{pickupTime}</strong>
      </div>

      <div className="search-item">
        <p>Ngày trả xe</p>
        <strong>{returnDate}</strong>
      </div>

      <div className="search-item">
        <p>Giờ trả xe</p>
        <strong>23:00</strong>
      </div>

      <button className="search-btn">TÌM XE</button>
    </div>
  );
}