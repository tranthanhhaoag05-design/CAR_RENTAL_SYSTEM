import api from "./api";

export const getVehicles = async () => {
  const response = await api.get("/vehicles");
  return Array.isArray(response.data) ? response.data : (response.data.data || []);
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data?.data || response.data || null;
};