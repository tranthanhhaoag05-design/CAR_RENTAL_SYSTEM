import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CarSection from "../components/CarSection";
import BrandSection from "../components/BrandSection";
import FeaturedLocations from "../components/FeaturedLocations";
import CustomerReviews from "../components/CustomerReviews";
import SiteFooter from "../components/SiteFooter";
import {
  banners,
  carsNow,
  suggestCars,
  luxuryCars,
  brands,
} from "../data/mockData";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner banners={banners} />

      <CarSection
        title="Xe có ngay"
        items={carsNow}
        moreLink="/xe-co-ngay"
      />

      <CarSection
        title="Xe có thể bạn sẽ thích"
        items={suggestCars}
        moreLink="/co-the-ban-se-thich"
      />

      <CarSection
        title="Xe cao cấp"
        items={luxuryCars}
        moreLink="/xe-cao-cap"
      />

      <BrandSection brands={brands} />
      <FeaturedLocations />
      <CustomerReviews />
      <SiteFooter />
    </>
  );
}