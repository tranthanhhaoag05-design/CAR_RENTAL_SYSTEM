import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";

export default function SearchBar() {
  const navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
  });

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

      const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setSearchData({
        location: "",
        pickupDate: formatDateForInput(pickup),
        pickupTime: formatTime(now),
        returnDate: formatDateForInput(dropoff),
        returnTime: "23:00",
      });
    };

    updateDateTime();
  }, []);

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <>
      <div className={isSticky ? "search-box sticky-search" : "search-box"}>
        <div className="search-item">
          <p>Địa điểm nhận xe</p>
          <button
            type="button"
            className="location-btn"
            onClick={() => setIsModalOpen(true)}
          >
            {searchData.location || "Chọn khu vực tìm xe"}
          </button>
        </div>

        <div className="search-item">
          <p>Ngày nhận xe</p>
          <strong>{formatDateDisplay(searchData.pickupDate)}</strong>
        </div>

        <div className="search-item">
          <p>Giờ nhận xe</p>
          <strong>{searchData.pickupTime}</strong>
        </div>

        <div className="search-item">
          <p>Ngày trả xe</p>
          <strong>{formatDateDisplay(searchData.returnDate)}</strong>
        </div>

        <div className="search-item">
          <p>Giờ trả xe</p>
          <strong>{searchData.returnTime}</strong>
        </div>

        <button
          className="search-btn"
          onClick={() =>
            navigate("/tim-kiem", {
              state: searchData,
            })
          }
        >
          TÌM XE
        </button>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchData={searchData}
        onApply={(form) => {
          setSearchData(form);
          setIsModalOpen(false);
          navigate("/tim-kiem", {
            state: form,
          });
        }}
      />
    </>
  );
}