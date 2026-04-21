import { Link } from "react-router-dom";
import CarCard from "./CarCard";

export default function CarSection({ title, items, moreLink }) {
  return (
    <section className="car-section">
      <div className="container">
        <div className="section-head">
          <h2>{title}</h2>
        </div>

        <div className="car-slider no-arrow-slider">
          {items.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {moreLink && (
          <div className="view-more-wrap">
            <Link to={moreLink} className="view-more-btn">
              XEM THÊM
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}