import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import {
  banners,
  brands,
  carsNow,
  suggestCars,
  luxuryCars,
  extraBrandCars,
} from "../data/mockData";
import "../styles/pages/rent-cars-page.css";

export default function RentCarsPage() {
  const { state } = useLocation();
  const selectedArea = state?.selectedArea || "";
  const [activeFilter, setActiveFilter] = useState("all");

  const allCars = useMemo(
    () => [...carsNow, ...suggestCars, ...luxuryCars, ...extraBrandCars],
    []
  );

  const filteredCars = useMemo(() => {
    let result = allCars;

    // Lọc theo khu vực được chọn từ modal tìm xe
    if (selectedArea) {
      const normalizedArea = selectedArea.toLowerCase().trim();
      result = result.filter((car) =>
        (car.location || "").toLowerCase().includes(normalizedArea)
      );
    }

    // Lọc theo thanh ngang
    if (activeFilter === "sale") {
      result = result.filter((car) => {
        const tag = (car.tag || "").toLowerCase();
        return tag.includes("sale") || tag.includes("giảm") || tag.includes("flash");
      });
    }

    if (activeFilter === "vinfast") {
      result = result.filter((car) =>
        (car.brand || "").toLowerCase().includes("vinfast")
      );
    }

    if (activeFilter === "electric") {
      result = result.filter((car) =>
        (car.fuel || "").toLowerCase().includes("điện")
      );
    }

    if (activeFilter === "area") {
      result = result.filter((car) => !!car.location);
    }

    return result;
  }, [allCars, selectedArea, activeFilter]);

  const groupedCars = brands
    .map((brand) => ({
      ...brand,
      cars: filteredCars.filter((car) => car.brand === brand.name),
    }))
    .filter((brand) => brand.cars.length > 0);

  const banner = banners[0];

  return (
    <>
      <Navbar />

      <section
        className="rent-page-hero"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <div className="rent-page-overlay">
          <div className="container rent-page-hero-content">
            <h1>Thuê xe theo khu vực</h1>
            <p>
              {selectedArea
                ? `Đang hiển thị xe tại khu vực: ${selectedArea}`
                : "Khám phá toàn bộ xe hiện có, sắp xếp theo từng hãng xe"}
            </p>
          </div>
        </div>
      </section>

      <section className="rent-page-section">
        <div className="container">
          {selectedArea && (
            <div className="rent-area-filter-box">
              <span className="rent-area-filter-label">Khu vực đang lọc</span>
              <strong>{selectedArea}</strong>
            </div>
          )}

          <div className="rent-filter-bar">
            <button
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => setActiveFilter("all")}
            >
              Tất cả
            </button>

            <button
              className={activeFilter === "sale" ? "active" : ""}
              onClick={() => setActiveFilter("sale")}
            >
              Sale
            </button>

            <button
              className={activeFilter === "vinfast" ? "active" : ""}
              onClick={() => setActiveFilter("vinfast")}
            >
              VinFast
            </button>

            <button
              className={activeFilter === "electric" ? "active" : ""}
              onClick={() => setActiveFilter("electric")}
            >
              Nhiên liệu
            </button>

            <button
              className={activeFilter === "area" ? "active" : ""}
              onClick={() => setActiveFilter("area")}
            >
              Khu vực xe
            </button>
          </div>

          {groupedCars.length > 0 ? (
            groupedCars.map((brand) => (
              <div className="brand-block" key={brand.id}>
                <div className="brand-block-header">
                  <h2>{brand.name}</h2>
                  <span>{brand.cars.length} xe</span>
                </div>

                <div className="rent-car-grid">
                  {brand.cars.map((car) => (
                    <Link
                      to={`/xe/${car.id}`}
                      className="rent-car-card-link"
                      key={car.id}
                    >
                      <div className="rent-car-card">
                        <div className="rent-car-image-wrap">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="rent-car-image"
                          />
                          <span className="rent-car-tag">{car.tag}</span>
                        </div>

                        <div className="rent-car-body">
                          <h3>{car.name}</h3>
                          <p className="rent-car-location">{car.location}</p>

                          <div className="rent-car-price">
                            <span className="rent-price-hour">{car.priceHour}</span>
                            <span className="rent-price-day">{car.priceDay}</span>
                          </div>

                          <div className="rent-car-info">
                            <span>{car.seats} chỗ</span>
                            <span>{car.transmission}</span>
                            <span>{car.fuel}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rent-empty-state">
              Không tìm thấy xe nào trong khu vực này.
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}