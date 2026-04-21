import { useEffect, useState } from "react";
import {
  initOrders,
  getAllOrders,
  getTotalRevenue,
  updateOrderStatus,
  initConsignments,
  getAllConsignments,
  updateConsignmentStatus,
} from "../data/orderDB";
import {
  fakeUsers,
  initCars,
  getActiveCars,
  getDeletedCars,
  addCar,
  updateCar,
  softDeleteCar,
  restoreCar,
} from "../data/fakeDB";
import "../styles/pages/admin-dashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("cars");
  const [cars, setCars] = useState([]);
  const [trashCars, setTrashCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [consignments, setConsignments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    brand: "",
    location: "",
    price: "",
  });

  const refreshData = () => {
    setCars(getActiveCars());
    setTrashCars(getDeletedCars());
    setOrders(getAllOrders());
    setConsignments(getAllConsignments());
  };

  useEffect(() => {
    initCars();
    initOrders();
    initConsignments();
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

    if (!form.name || !form.brand || !form.location || !form.price) return;

    if (isEditing) {
      updateCar({
        id: form.id,
        name: form.name,
        brand: form.brand,
        location: form.location,
        price: Number(form.price),
        deleted: false,
      });
    } else {
      addCar({
        name: form.name,
        brand: form.brand,
        location: form.location,
        price: Number(form.price),
      });
    }

    refreshData();
    resetForm();
  };

  const handleEdit = (car) => {
    setForm({
      id: car.id,
      name: car.name,
      brand: car.brand,
      location: car.location,
      price: car.price,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    softDeleteCar(id);
    refreshData();
  };

  const handleRestore = (id) => {
    restoreCar(id);
    refreshData();
  };

  const handleDriverAccept = (orderId) => {
    updateOrderStatus(orderId, "accepted", "Tài xế Nguyễn Văn A");
    refreshData();
  };

  const handleCompleteOrder = (orderId) => {
    updateOrderStatus(orderId, "completed");
    refreshData();
  };

  const handleApproveConsignment = (item) => {
    addCar({
      name: item.model || "Xe ký gửi",
      brand: item.brand || "Chưa rõ",
      location: item.city || "Chưa rõ",
      price: Number(item.price || 0),
      seats: Number(item.seats || 4),
      transmission: item.transmission || "Số tự động",
      fuel: item.fuel || "Xăng",
      image: item.image || "",
    });

    updateConsignmentStatus(item.id, "approved");
    refreshData();
  };

  const handleRejectConsignment = (id) => {
    updateConsignmentStatus(id, "rejected");
    refreshData();
  };

  const totalRevenue = getTotalRevenue();

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
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">
            <a href="/">← Trở về trang chính</a>
          </div>
          <h1 className="admin-title">Trang quản trị</h1>
          <p className="admin-subtitle">
            Quản lý xe, khách hàng, doanh thu thật, ký gửi xe và khôi phục dữ liệu từ thùng rác
          </p>
        </div>
      </div>

      <div className="admin-cards">
        <div className="admin-card gradient-blue">
          <h3>🚗 Tổng xe đang hoạt động</h3>
          <p>{cars.length}</p>
        </div>

        <div className="admin-card gradient-green">
          <h3>👤 Khách hàng</h3>
          <p>{fakeUsers.filter((u) => u.role === "user").length}</p>
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
          <p>{consignments.filter((item) => item.status === "pending").length}</p>
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
                    <td>{Number(car.price).toLocaleString("vi-VN")}đ</td>
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

                {cars.length === 0 && (
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
              {fakeUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="admin-section">
          <h2>Đơn thuê xe / doanh thu thật</h2>

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
                  <td>{order.userName}</td>
                  <td>{order.carName}</td>
                  <td>{order.location}</td>
                  <td>{Number(order.total || 0).toLocaleString("vi-VN")}đ</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          order.status === "waiting_driver"
                            ? "#f59e0b"
                            : order.status === "accepted"
                            ? "#3b82f6"
                            : order.status === "completed"
                            ? "#16a34a"
                            : "#ef4444",
                      }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{order.driverName || "Chưa có"}</td>
                  <td>
                    <div className="action-buttons">
                      {order.status === "waiting_driver" && (
                        <button
                          className="btn-edit"
                          onClick={() => handleDriverAccept(order.id)}
                        >
                          Tài xế nhận đơn
                        </button>
                      )}

                      {order.status === "accepted" && (
                        <button
                          className="btn-primary"
                          onClick={() => handleCompleteOrder(order.id)}
                        >
                          Hoàn tất
                        </button>
                      )}

                      {order.status === "completed" && (
                        <span style={{ color: "#16a34a", fontWeight: 700 }}>
                          Đã hoàn tất
                        </span>
                      )}

                      {order.status === "cancelled" && (
                        <span style={{ color: "#ef4444", fontWeight: 700 }}>
                          Đã hủy
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-row">
                    Chưa có đơn thuê xe nào
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
                <th>Hãng</th>
                <th>Mẫu xe</th>
                <th>Năm SX</th>
                <th>Thành phố</th>
                <th>Số ngày cho thuê</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {consignments.map((item) => (
                <tr key={item.id}>
                  <td>{item.ownerName || "Người dùng"}</td>
                  <td>{item.brand || "Chưa rõ"}</td>
                  <td>{item.model || "Chưa rõ"}</td>
                  <td>{item.year || "Chưa rõ"}</td>
                  <td>{item.city || "Chưa rõ"}</td>
                  <td>{item.rentalDays || "Chưa rõ"}</td>
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
                          Đã thêm xe
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

              {consignments.length === 0 && (
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
                  <td>{Number(car.price).toLocaleString("vi-VN")}đ</td>
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