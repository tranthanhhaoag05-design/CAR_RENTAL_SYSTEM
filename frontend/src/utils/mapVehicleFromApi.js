export function mapVehicleFromApi(car) {
  const priceDay = Number(car.price_per_day || 0);
  const priceHour = Math.round(priceDay / 4);

  return {
    id: car.id,
    name: car.name,
    location: car.location || "",
    priceHour: `${priceHour}K/4h`,
    priceDay: `${Math.round(priceDay / 1000)}K/24h`,
    seats: car.seats || 4,
    transmission: car.transmission || "",
    fuel: car.fuel || "",
    image: car.image_url || "https://via.placeholder.com/400x250?text=No+Image",
    tag: car.tag || "",
    brand: car.brand || "",
    type: car.type || "",
    status: car.status || "",
  };
}