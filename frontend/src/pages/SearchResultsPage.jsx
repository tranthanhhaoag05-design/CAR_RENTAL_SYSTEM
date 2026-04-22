import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import SearchModal from "../components/SearchModal";
import CarCard from "../components/CarCard";
import { getVehicles } from "../services/vehicleService";
import { mapVehicleFromApi } from "../utils/mapVehicleFromApi";

export default function SearchResultsPage() {
  const { state } = useLocation();

  const defaultSearchData = {
    location: "Chọn địa điểm tìm xe",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
  };

  const [cars, setCars] = useState([]);
  const [searchData, setSearchData] = useState(state || defaultSearchData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    saleOnly: false,
    seats: "",
    brand: state?.selectedBrand || "",
    fuel: "",
    area: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getVehicles();
        setCars(data.map(mapVehicleFromApi));
      } catch (error) {
        console.error("Lỗi lấy xe ở SearchResultsPage:", error);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  const brandOptions = [...new Set(cars.map((car) => car.brand).filter(Boolean))];
  const fuelOptions = [...new Set(cars.map((car) => car.fuel).filter(Boolean))];
  const areaOptions = [...new Set(cars.map((car) => car.location).filter(Boolean))];

  const filteredCars = cars.filter((car) => {
    const normalizedSearchLocation = (searchData.location || "").toLowerCase().trim();
    const normalizedCarLocation = (car.location || "").toLowerCase().trim();

    const matchSearchLocation =
      !normalizedSearchLocation ||
      normalizedSearchLocation === "chọn địa điểm tìm xe" ||
      normalizedCarLocation.includes(normalizedSearchLocation) ||
      normalizedSearchLocation.includes(normalizedCarLocation);

    const matchSale =
      !filters.saleOnly ||
      (car.tag || "").toLowerCase().includes("sale") ||
      (car.tag || "").toLowerCase().includes("giảm") ||
      (car.tag || "").toLowerCase().includes("ưu đãi") ||
      (car.tag || "").toLowerCase().includes("flash");

    const matchSeats =
      !filters.seats || String(car.seats) === String(filters.seats);

    const matchBrand =
      !filters.brand || car.brand === filters.brand;

    const matchFuel =
      !filters.fuel || car.fuel === filters.fuel;

    const matchArea =
      !filters.area || car.location === filters.area;

    return (
      matchSearchLocation &&
      matchSale &&
      matchSeats &&
      matchBrand &&
      matchFuel &&
      matchArea
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const summaryText =
    searchData.pickupTime &&
    searchData.pickupDate &&
    searchData.returnTime &&
    searchData.returnDate
      ? `${searchData.pickupTime}, ${formatDate(searchData.pickupDate)} đến ${searchData.returnTime}, ${formatDate(searchData.returnDate)}`
      : "Chọn thời gian thuê xe";

  const resetFilters = () => {
    setFilters({
      saleOnly: false,
      seats: "",
      brand: "",
      fuel: "",
      area: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="search-results-hero">
        <div className="container">
          <div className="search-results-topbar">
            <div className="search-results-title">Tìm xe tự lái</div>

            <button
              type="button"
              className="search-results-info"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="search-results-left">
                {searchData.location || "Chọn địa điểm tìm xe"}
              </div>
              <div className="search-results-right">{summaryText}</div>
            </button>

            <button
              type="button"
              className="search-results-btn"
              onClick={() => setIsModalOpen(true)}
            >
              TÌM XE
            </button>
          </div>
        </div>
      </section>

      <section className="search-results-section">
        <div className="container">
          <div className="search-results-chip-row">
            <button
              className={`search-chip ${!filters.saleOnly && !filters.seats && !filters.brand && !filters.fuel && !filters.area ? "active" : ""}`}
              onClick={resetFilters}
            >
              Tất cả
            </button>

            <button
              className={`search-chip ${filters.saleOnly ? "active" : ""}`}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  saleOnly: !prev.saleOnly,
                }))
              }
            >
              Sale
            </button>

            <select
              className={`search-chip search-chip-select ${filters.seats ? "active" : ""}`}
              value={filters.seats}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  seats: e.target.value,
                }))
              }
            >
              <option value="">Số chỗ</option>
              <option value="4">4 chỗ</option>
              <option value="5">5 chỗ</option>
              <option value="7">7 chỗ</option>
            </select>

            <select
              className={`search-chip search-chip-select ${filters.brand ? "active" : ""}`}
              value={filters.brand}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  brand: e.target.value,
                }))
              }
            >
              <option value="">Hãng xe</option>
              {brandOptions.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              className={`search-chip search-chip-select ${filters.fuel ? "active" : ""}`}
              value={filters.fuel}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  fuel: e.target.value,
                }))
              }
            >
              <option value="">Nhiên liệu</option>
              {fuelOptions.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>

            <select
              className={`search-chip search-chip-select ${filters.area ? "active" : ""}`}
              value={filters.area}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  area: e.target.value,
                }))
              }
            >
              <option value="">Khu vực xe</option>
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="search-results-count">
            Tìm thấy <strong>{filteredCars.length}</strong> xe
          </div>

          <div className="search-results-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => <CarCard key={car.id} car={car} />)
            ) : (
              <div className="search-results-empty">
                Không có xe phù hợp với bộ lọc hiện tại.
              </div>
            )}
          </div>
        </div>
      </section>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchData={searchData}
        onApply={(form) => {
          setSearchData(form);
          setIsModalOpen(false);
        }}
      />

      <SiteFooter />
    </>
  );
}