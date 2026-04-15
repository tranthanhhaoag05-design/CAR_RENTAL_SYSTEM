import { useRef } from "react";

export default function BrandSection({ brands, activeBrand, onSelectBrand }) {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    sliderRef.current.classList.add("dragging");
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="brand-section">
      <div className="container">
        <div className="section-head">
          <h2>Chọn xe theo hãng</h2>
        </div>

        <div
          className="brand-slider no-arrow-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              className={`brand-card ${activeBrand === brand.name ? "active" : ""}`}
              onClick={() => onSelectBrand(brand.name)}
            >
              <div className="brand-logo-wrap">
                <img src={brand.image} alt={brand.name} className="brand-logo" />
              </div>
              <p>{brand.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}