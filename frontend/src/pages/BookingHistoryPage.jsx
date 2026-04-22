import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { getMyBookingsApi } from "../services/bookingService";

export default function BookingHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!currentUser || !token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getMyBookingsApi(token);
        const data = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];
        setOrders(data.reverse());
      } catch (error) {
        console.error("Lỗi lấy lịch sử đặt xe:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [currentUser, token]);

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
      case "pending":
        return "Đang chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      default:
        return status || "Không xác định";
    }
  };

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
  };

  const getCarName = (order) => {
    return (
      order?.vehicle?.name ||
      order?.car_name ||
      `Xe #${order?.vehicle_id || ""}`
    );
  };

  return (
    <>
      <Navbar />

      <section className="container" style={{ padding: "40px 0 80px" }}>
        <h1 style={{ marginBottom: 24 }}>Lịch sử đặt xe</h1>

        {!currentUser ? (
          <p>Bạn cần đăng nhập để xem lịch sử đặt xe.</p>
        ) : loading ? (
          <p>Đang tải lịch sử đặt xe...</p>
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
                <h3>{getCarName(order)}</h3>
                <p>Xe ID: {order.vehicle_id}</p>
                <p>Giá: {formatMoney(order.total_price)}</p>
                <p>
                  Tiền cọc: <strong>{formatMoney(order.deposit_amount)}</strong>
                </p>
                <p>
                  Trạng thái đơn: <strong>{getStatusText(order.status)}</strong>
                </p>
                <p>
                  Thanh toán: <strong>{order.payment_status || "unpaid"}</strong>
                </p>
                <p>
                  Hình thức:{" "}
                  <strong>
                    {order.service_type === "with_driver"
                      ? "Có tài xế"
                      : "Tự lái"}
                  </strong>
                </p>
                <p>
                  Bắt đầu:{" "}
                  {order.start_date
                    ? new Date(order.start_date).toLocaleString("vi-VN")
                    : "-"}
                </p>
                <p>
                  Kết thúc:{" "}
                  {order.end_date
                    ? new Date(order.end_date).toLocaleString("vi-VN")
                    : "-"}
                </p>
                <p>
                  Ngày đặt:{" "}
                  {order.created_at
                    ? new Date(order.created_at).toLocaleString("vi-VN")
                    : "-"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </>
  );
}