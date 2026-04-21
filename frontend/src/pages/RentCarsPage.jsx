import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { banners, brands, carsNow, suggestCars, luxuryCars, extraBrandCars } from "../data/mockData";
import "../styles/pages/rent-cars-page.css";

export default function RentCarsPage() {
  const allCars = [...carsNow, ...suggestCars, ...luxuryCars, ...extraBrandCars];

  const groupedCars = brands.map((brand) => ({
    ...brand,
    cars: allCars.filter((car) => car.brand === brand.name),
  }));

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
            <h1>Thuê xe theo hãng</h1>
            <p>Khám phá toàn bộ xe hiện có, sắp xếp theo từng hãng xe</p>
          </div>
        </div>
      </section>

      <section className="rent-page-section">
        <div className="container">
          {groupedCars.map((brand) => (
            <div className="brand-block" key={brand.id}>
              <div className="brand-block-header">
                <h2>{brand.name}</h2>
                <span>{brand.cars.length} xe</span>
              </div>

              {brand.cars.length > 0 ? (
                <div className="rent-car-grid">
                  {brand.cars.map((car) => (
                    <div className="rent-car-card" key={car.id}>
                      <div className="rent-car-image-wrap">
                        <img src={car.image} alt={car.name} className="rent-car-image" />
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
                  ))}
                </div>
              ) : (
                <p className="brand-empty">Hiện chưa có xe cho hãng này.</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}