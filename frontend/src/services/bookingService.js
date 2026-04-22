import api from "./api";

export const createBookingApi = async (formData, token) => {
  const response = await api.post("/bookings", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyBookingsApi = async (token) => {
  const response = await api.get("/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAdminBookingsApi = async (token) => {
  const response = await api.get("/admin/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};