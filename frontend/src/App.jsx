import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarsNowPage from "./pages/CarsNowPage";
import SuggestPage from "./pages/SuggestPage";
import LuxuryPage from "./pages/LuxuryPage";
import BlankPage from "./pages/BlankPage";
import LoginPage from "./pages/LoginPage";
import RentCarsPage from "./pages/RentCarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ConsignmentPage from "./pages/ConsignmentPage";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import BookingHistoryPage from "./pages/BookingHistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/xe-co-ngay" element={<CarsNowPage />} />
      <Route path="/co-the-ban-se-thich" element={<SuggestPage />} />
      <Route path="/xe-cao-cap" element={<LuxuryPage />} />
      <Route path="/trang-trang" element={<BlankPage title="Trang trắng" />} />
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route path="/thue-xe" element={<RentCarsPage />} />
      <Route path="/xe/:id" element={<CarDetailPage />} />
      <Route path="/tim-xe" element={<SearchResultsPage />} />
      <Route path="/ky-gui-xe" element={<ConsignmentPage />} />
      <Route path="/lich-su-dat-xe" element={<BookingHistoryPage />} />

     
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;