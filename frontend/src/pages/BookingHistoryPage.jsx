import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { getOrdersByUser } from "../data/orderDB";

export default function BookingHistoryPage() {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    if (currentUser) {
      setOrders(getOrdersByUser(currentUser.id).reverse());
    }
  }, [currentUser]);

  const getStatusText = (status) => {
    switch (status) {
      case "waiting_driver":
        return "Chờ tài xế nhận đơn";
      case "accepted":
        return "Đặt xe thành công";
      case "completed":
        return "Hoàn tất";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <>
      <Navbar />

      <section className="container" style={{ padding: "40px 0 80px" }}>
        <h1 style={{ marginBottom: 24 }}>Lịch sử đặt xe</h1>

        {!currentUser ? (
          <p>Bạn cần đăng nhập để xem lịch sử đặt xe.</p>
        ) : orders.length === 0 ? (
          <p>Bạn chưa có đơn đặt xe nào.</p>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3>{order.carName}</h3>
                <p>Khu vực: {order.location}</p>
                <p>Giá: {Number(order.total).toLocaleString("vi-VN")}đ</p>
                <p>Trạng thái: <strong>{getStatusText(order.status)}</strong></p>
                <p>Tài xế: {order.driverName || "Chưa có tài xế nhận"}</p>
                <p>Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </>
  );
}