import api from "./api";

export const loginApi = async ({ phone_number, password }) => {
  const response = await api.post("/login", {
    phone_number,
    password,
  });
  return response.data;
};

export const registerApi = async ({ full_name, phone_number, password }) => {
  const response = await api.post("/register", {
    full_name,
    phone_number,
    password,
  });
  return response.data;
};

export const getCurrentUserApi = async (token) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutApi = async (token) => {
  const response = await api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};