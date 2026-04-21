import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarsNowPage from "./pages/CarsNowPage";
import SuggestPage from "./pages/SuggestPage";
import LuxuryPage from "./pages/LuxuryPage";
import BlankPage from "./pages/BlankPage";
import LoginPage from "./pages/LoginPage";
import RentCarsPage from "./pages/RentCarsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/xe-co-ngay" element={<CarsNowPage />} />
      <Route path="/co-the-ban-se-thich" element={<SuggestPage />} />
      <Route path="/xe-cao-cap" element={<LuxuryPage />} />
      <Route path="/trang-trang" element={<BlankPage title="Trang trắng" />} />
      <Route path="/dang-nhap" element={<LoginPage />} />

      {/* 👇 THÊM DÒNG NÀY */}
      <Route path="/thue-xe" element={<RentCarsPage />} />
    </Routes>
  );
}

export default App;