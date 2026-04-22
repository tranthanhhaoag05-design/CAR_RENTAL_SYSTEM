import { useEffect, useMemo, useState } from "react";
import { getVehicles } from "../services/vehicleService";
import {
  getAdminBookingsApi,
} from "../services/bookingService";
import api from "../services/api";
import {
  getConsignmentsApi,
  updateConsignmentStatusApi,
} from "../services/consignmentService";
import { mapVehicleFromApi } from "../utils/mapVehicleFromApi";
import "../styles/pages/admin-dashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("cars");
  const [cars, setCars] = useState([]);
  const [trashCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [consignments, setConsignments] = useState([]);

  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingConsignments, setLoadingConsignments] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    brand: "",
    location: "",
    price: "",
  });

  const token = localStorage.getItem("access_token");

  const refreshCars = async () => {
    try {
      setLoadingCars(true);
      const data = await getVehicles();
      const mapped = data.map(mapVehicleFromApi).map((car) => ({
        ...car,
        price: Number(car.price_per_day || 0),
      }));
      setCars(mapped);
    } catch (error) {
      console.error("Lỗi lấy danh sách xe:", error);
      setCars([]);
    } finally {
      setLoadingCars(false);
    }
  };

  const refreshOrders = async () => {
    try {
      setLoadingOrders(true);
      const result = await getAdminBookingsApi(token);
      const data = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];
      setOrders(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn admin:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const refreshUsers = async () => {
    try {
      setLoadingUsers(true);
      const result = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(result?.data?.data)
        ? result.data.data
        : Array.isArray(result?.data)
        ? result.data
        : [];

      setUsers(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách user:", error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const refreshConsignments = async () => {
    try {
      setLoadingConsignments(true);
      const result = await getConsignmentsApi();
      const data = Array.isArray(result?.data) ? result.data : [];
      setConsignments(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách ký gửi:", error);
      setConsignments([]);
    } finally {
      setLoadingConsignments(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([
      refreshCars(),
      refreshOrders(),
      refreshUsers(),
      refreshConsignments(),
    ]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      brand: "",
      location: "",
      price: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Backend hiện chưa có API thêm/sửa xe cho admin.");
    resetForm();
  };

  const handleEdit = (car) => {
    setForm({
      id: car.id,
      name: car.name,
      brand: car.brand,
      location: car.location,
      price: car.price_per_day || 0,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = () => {
    alert("Backend hiện chưa có API xóa xe cho admin.");
  };

  const handleRestore = () => {
    alert("Backend hiện chưa có API khôi phục xe.");
  };

  const handleDriverAccept = () => {
    alert("Backend hiện chưa nối API nhận đơn/gán tài xế ở dashboard này.");
  };

  const handleCompleteOrder = () => {
    alert("Backend hiện chưa nối API hoàn tất đơn ở dashboard này.");
  };

  const handleApproveConsignment = async (item) => {
    try {
      await updateConsignmentStatusApi(item.id, "approved", token);
      await refreshConsignments();
    } catch (error) {
      alert(
        error?.response?.data?.message || "Không thể duyệt ký gửi lúc này."
      );
    }
  };

  const handleRejectConsignment = async (id) => {
    try {
      await updateConsignmentStatusApi(id, "rejected", token);
      await refreshConsignments();
    } catch (error) {
      alert(
        error?.response?.data?.message || "Không thể từ chối ký gửi lúc này."
      );
    }
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (sum, order) => sum + Number(order.total_price || 0),
      0
    );
  }, [orders]);

  const pendingConsignments = consignments.filter(
    (item) => item.status === "pending"
  );

  const customerList = users.filter(
    (u) => u.role === "user" || u.role === "customer"
  );

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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">
            <a href="/">← Trở về trang chính</a>
          </div>
          <h1 className="admin-title">Trang quản trị</h1>
          <p className="admin-subtitle">
            Quản lý xe, khách hàng, doanh thu, ký gửi xe và dữ liệu hệ thống
          </p>
        </div>
      </div>

      <div className="admin-cards">
        <div className="admin-card gradient-blue">
          <h3>🚗 Tổng xe đang hoạt động</h3>
          <p>{loadingCars ? "..." : cars.length}</p>
        </div>

        <div className="admin-card gradient-green">
          <h3>👤 Khách hàng</h3>
          <p>{loadingUsers ? "..." : customerList.length}</p>
        </div>

        <div className="admin-card gradient-orange">
          <h3>💰 Doanh thu</h3>
          <p>{totalRevenue.toLocaleString("vi-VN")}đ</p>
        </div>

        <div className="admin-card gradient-red">
          <h3>🗑 Trong thùng rác</h3>
          <p>{trashCars.length}</p>
        </div>

        <div className="admin-card gradient-blue">
          <h3>📩 Ký gửi chờ duyệt</h3>
          <p>{loadingConsignments ? "..." : pendingConsignments.length}</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "cars" ? "active" : ""}
          onClick={() => setActiveTab("cars")}
        >
          Quản lý xe
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Khách hàng
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Đơn thuê / Doanh thu
        </button>

        <button
          className={activeTab === "consignments" ? "active" : ""}
          onClick={() => setActiveTab("consignments")}
        >
          Ký gửi xe
        </button>

        <button
          className={activeTab === "trash" ? "active" : ""}
          onClick={() => setActiveTab("trash")}
        >
          Mục rác
        </button>
      </div>

      {activeTab === "cars" && (
        <>
          <div className="admin-section">
            <h2>{isEditing ? "Sửa xe" : "Thêm xe mới"}</h2>

            <form className="admin-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tên xe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Hãng xe"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
              <input
                type="text"
                placeholder="Khu vực"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                type="number"
                placeholder="Giá thuê"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <div className="admin-form-actions">
                <button type="submit" className="btn-primary">
                  {isEditing ? "Lưu thay đổi" : "Thêm xe"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={resetForm}
                  >
                    Hủy
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-section">
            <h2>Danh sách xe</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tên xe</th>
                  <th>Hãng</th>
                  <th>Khu vực</th>
                  <th>Giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.name}</td>
                    <td>{car.brand}</td>
                    <td>{car.location}</td>
                    <td>
                      {Number(car.price_per_day || 0).toLocaleString("vi-VN")}đ
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(car)}
                        >
                          Sửa
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(car.id)}
                        >
                          Xóa
                        </button>

                        <button className="btn-contact">Liên hệ tài xế</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loadingCars && cars.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      Chưa có xe nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "users" && (
        <div className="admin-section">
          <h2>Danh sách khách hàng</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Quyền</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((user) => (
                <tr key={user.id}>
                  <td>{user.full_name || user.name || "-"}</td>
                  <td>{user.phone_number || user.phone || "-"}</td>
                  <td>{user.role}</td>
                </tr>
              ))}

              {!loadingUsers && customerList.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty-row">
                    Chưa có dữ liệu khách hàng để hiển thị
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="admin-section">
          <h2>Đơn thuê xe / doanh thu</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Xe</th>
                <th>Khu vực</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Tài xế</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customer?.full_name || `User #${order.customer_id}`}</td>
                  <td>{order.vehicle?.name || `Xe #${order.vehicle_id}`}</td>
                  <td>{order.vehicle?.location || "-"}</td>
                  <td>
                    {Number(order.total_price || 0).toLocaleString("vi-VN")}đ
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{order.driver?.full_name || "Chưa có"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleDriverAccept(order.id)}
                      >
                        Nhận đơn
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => handleCompleteOrder(order.id)}
                      >
                        Hoàn tất
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loadingOrders && orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-row">
                    Chưa có dữ liệu đơn thuê trong dashboard này
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "consignments" && (
        <div className="admin-section">
          <h2>Danh sách ký gửi xe</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Người gửi</th>
                <th>Tên xe</th>
                <th>Hãng</th>
                <th>Giá/ngày</th>
                <th>Số ghế</th>
                <th>Hộp số</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {consignments.map((item) => (
                <tr key={item.id}>
                  <td>{item.user?.full_name || `User #${item.user_id}`}</td>
                  <td>{item.car_name || "Chưa rõ"}</td>
                  <td>{item.brand || "Chưa rõ"}</td>
                  <td>
                    {Number(item.price_per_day || 0).toLocaleString("vi-VN")}đ
                  </td>
                  <td>{item.seats || "-"}</td>
                  <td>{item.transmission || "-"}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          item.status === "pending"
                            ? "#f59e0b"
                            : item.status === "approved"
                            ? "#16a34a"
                            : "#ef4444",
                      }}
                    >
                      {item.status === "pending" && "Chờ duyệt"}
                      {item.status === "approved" && "Đã duyệt"}
                      {item.status === "rejected" && "Đã từ chối"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {item.status === "pending" && (
                        <>
                          <button
                            className="btn-primary"
                            onClick={() => handleApproveConsignment(item)}
                          >
                            Duyệt
                          </button>

                          <button
                            className="btn-delete"
                            onClick={() => handleRejectConsignment(item.id)}
                          >
                            Từ chối
                          </button>
                        </>
                      )}

                      {item.status === "approved" && (
                        <span style={{ color: "#16a34a", fontWeight: 700 }}>
                          Đã duyệt
                        </span>
                      )}

                      {item.status === "rejected" && (
                        <span style={{ color: "#ef4444", fontWeight: 700 }}>
                          Đã từ chối
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {!loadingConsignments && consignments.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-row">
                    Chưa có yêu cầu ký gửi xe nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "trash" && (
        <div className="admin-section">
          <h2>Mục rác</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên xe</th>
                <th>Hãng</th>
                <th>Khu vực</th>
                <th>Giá</th>
                <th>Khôi phục</th>
              </tr>
            </thead>
            <tbody>
              {trashCars.map((car) => (
                <tr key={car.id}>
                  <td>{car.name}</td>
                  <td>{car.brand}</td>
                  <td>{car.location}</td>
                  <td>{Number(car.price || 0).toLocaleString("vi-VN")}đ</td>
                  <td>
                    <button
                      className="btn-restore"
                      onClick={() => handleRestore(car.id)}
                    >
                      Hoàn lại
                    </button>
                  </td>
                </tr>
              ))}

              {trashCars.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-row">
                    Chưa có dữ liệu nào trong mục rác
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}