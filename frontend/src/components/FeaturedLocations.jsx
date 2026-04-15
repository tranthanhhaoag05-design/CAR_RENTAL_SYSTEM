const locations = [
  {
    id: 1,
    name: "Hồ Chí Minh",
    cars: "500+ xe",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Bình Dương",
    cars: "150+ xe",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Hà Nội",
    cars: "150+ xe",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Đà Lạt",
    cars: "100+ xe",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Đồng Nai",
    cars: "100+ xe",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Cần Thơ",
    cars: "90+ xe",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Vũng Tàu",
    cars: "120+ xe",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Nha Trang",
    cars: "130+ xe",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Đà Nẵng",
    cars: "180+ xe",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedLocations() {
  return (
    <section className="featured-locations">
      <h2 className="section-title">Địa điểm nổi bật</h2>

      <div className="featured-scroll-wrap">
        <div className="featured-locations-grid horizontal-scroll">
          {locations.map((location) => (
            <div className="location-card" key={location.id}>
              <img src={location.image} alt={location.name} />
              <div className="location-card-body">
                <h3>{location.name}</h3>

                <div className="location-card-bottom">
                  <span className="location-cars">🚗 {location.cars}</span>
                  <button>TÌM XE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}