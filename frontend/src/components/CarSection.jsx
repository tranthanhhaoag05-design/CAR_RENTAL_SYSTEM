import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { useRef } from "react";

export default function CarSection({ title, items, moreLink }) {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const raf = useRef(null);

  const handleMouseDown = (e) => {
    isDown.current = true;
    sliderRef.current.classList.add("dragging");

    startX.current = e.pageX;
    scrollLeft.current = sliderRef.current.scrollLeft;

    cancelAnimationFrame(raf.current);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
    startInertia();
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
    startInertia();
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    const dx = e.pageX - startX.current;

    // giảm lực kéo để mượt hơn
    const move = dx * 0.9;

    sliderRef.current.scrollLeft = scrollLeft.current - move;

    // lưu velocity để tạo quán tính
    velocity.current = dx * 0.18;
  };

  // inertia (quán tính sau khi thả chuột)
  const startInertia = () => {
    const step = () => {
      if (Math.abs(velocity.current) < 0.1) return;

      sliderRef.current.scrollLeft -= velocity.current;
      velocity.current *= 1;

      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
  };

  return (
    <section className="car-section">
      <div className="container">
        <div className="section-head">
          <h2>{title}</h2>
        </div>

        <div
          className="car-slider no-arrow-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
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