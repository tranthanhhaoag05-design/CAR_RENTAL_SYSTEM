import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function HeroBanner({ banners = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const banner = banners[current];

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${banner.image})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>{banner.title}</h1>
            <p>{banner.subtitle}</p>
          </div>

          <div className="hero-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={current === index ? "dot active" : "dot"}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>

          <SearchBar />
        </div>
      </div>
    </section>
  );
}