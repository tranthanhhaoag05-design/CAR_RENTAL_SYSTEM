import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <Link to={`/xe/${car.id}`} className="car-card-link">
      <div className="car-card">
        <div className="car-image-wrap">
          <img src={car.image} alt={car.name} className="car-image" />
          <span className="car-tag">{car.tag}</span>
        </div>

        <div className="car-body">
          <h3>{car.name}</h3>
          <p className="car-location">{car.location}</p>

          <div className="car-price">
            <span className="price-main">{car.priceHour}</span>
            <span className="price-sub">{car.priceDay}</span>
          </div>

          <div className="car-info">
            <span>{car.seats} chỗ</span>
            <span>{car.transmission}</span>
            <span>{car.fuel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}