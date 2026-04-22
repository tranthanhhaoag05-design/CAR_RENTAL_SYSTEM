import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CarSection from "../components/CarSection";
import BrandSection from "../components/BrandSection";
import FeaturedLocations from "../components/FeaturedLocations";
import CustomerReviews from "../components/CustomerReviews";
import SiteFooter from "../components/SiteFooter";
import { banners, brands } from "../data/uiData";
import { getVehicles } from "../services/vehicleService";
import { mapVehicleFromApi } from "../utils/mapVehicleFromApi";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getVehicles();
        const mappedCars = data.map(mapVehicleFromApi);
        setCars(mappedCars);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu xe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <Navbar />
      <HeroBanner banners={banners} />

      <CarSection
        title="Xe có ngay"
        items={cars.slice(0, 5)}
        moreLink="/xe-co-ngay"
      />

      <CarSection
        title="Xe có thể bạn sẽ thích"
        items={cars.slice(5, 10)}
        moreLink="/co-the-ban-se-thich"
      />

      <CarSection
        title="Xe cao cấp"
        items={cars.slice(10, 15)}
        moreLink="/xe-cao-cap"
      />

      <BrandSection brands={brands} />
      <FeaturedLocations />
      <CustomerReviews />
      <SiteFooter />
    </>
  );
}