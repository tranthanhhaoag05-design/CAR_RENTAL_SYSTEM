const ORDERS_KEY = "orders_db";
const CONSIGNMENTS_KEY = "consignments_db";

export const initOrders = () => {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
};

export const getAllOrders = () => {
  initOrders();
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
};

export const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const parsePriceToNumber = (priceStr) => {
  if (!priceStr) return 0;
  return Number(String(priceStr).replace("K/24h", "").replace("K/4h", "").trim()) * 1000;
};

export const addOrder = (order) => {
  const orders = getAllOrders();

  const newOrder = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "waiting_driver", // waiting_driver | accepted | completed | cancelled
    driverName: "",
    ...order,
  };

  saveOrders([...orders, newOrder]);
  return newOrder;
};

export const updateOrderStatus = (orderId, newStatus, driverName = "") => {
  const orders = getAllOrders().map((order) =>
    order.id === orderId
      ? {
          ...order,
          status: newStatus,
          driverName: driverName || order.driverName,
        }
      : order
  );

  saveOrders(orders);
};

export const getOrdersByUser = (userId) => {
  return getAllOrders().filter((order) => String(order.userId) === String(userId));
};

export const getSuccessfulOrders = () => {
  return getAllOrders().filter(
    (order) => order.status === "accepted" || order.status === "completed"
  );
};

export const getTotalRevenue = () => {
  return getSuccessfulOrders().reduce((sum, order) => sum + Number(order.total || 0), 0);
};

/* ---------------- KÝ GỬI XE ---------------- */

export const initConsignments = () => {
  const stored = localStorage.getItem(CONSIGNMENTS_KEY);
  if (!stored) {
    localStorage.setItem(CONSIGNMENTS_KEY, JSON.stringify([]));
  }
};

export const getAllConsignments = () => {
  initConsignments();
  return JSON.parse(localStorage.getItem(CONSIGNMENTS_KEY) || "[]");
};

export const saveConsignments = (data) => {
  localStorage.setItem(CONSIGNMENTS_KEY, JSON.stringify(data));
};

export const addConsignment = (consignment) => {
  const list = getAllConsignments();
  const newItem = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "pending", // pending | approved | rejected
    ...consignment,
  };
  saveConsignments([...list, newItem]);
  return newItem;
};

export const updateConsignmentStatus = (id, status) => {
  const list = getAllConsignments().map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveConsignments(list);
};