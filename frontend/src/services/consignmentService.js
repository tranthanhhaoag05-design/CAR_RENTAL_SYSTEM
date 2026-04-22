import api from "./api";

export const getConsignmentsApi = async () => {
  const response = await api.get("/consignments");
  return response.data;
};

export const createConsignmentApi = async (payload, token) => {
  const response = await api.post("/consignments", payload, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return response.data;
};

export const updateConsignmentStatusApi = async (id, status, token) => {
  const response = await api.put(
    `/consignments/${id}/status`,
    { status },
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    }
  );

  return response.data;
};