import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BrandSection({ brands, activeBrand, onSelectBrand }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;

    isDown.current = true;
    isDragging.current = false;
    sliderRef.current.classList.add("dragging");
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;

    isDown.current = false;
    sliderRef.current.classList.remove("dragging");

    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;

    isDown.current = false;
    sliderRef.current.classList.remove("dragging");

    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !sliderRef.current) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const diff = x - startX.current;

    if (Math.abs(diff) > 5) {
      isDragging.current = true;
    }

    const walk = diff * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleBrandClick = (brandName) => {
    if (isDragging.current) return;

    if (typeof onSelectBrand === "function") {
      onSelectBrand(brandName);
      return;
    }

    navigate("/tim-xe", {
      state: {
        location: "Chọn địa điểm tìm xe",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        selectedBrand: brandName,
      },
    });
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
              onClick={() => handleBrandClick(brand.name)}
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