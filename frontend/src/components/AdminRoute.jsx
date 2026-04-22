import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const token = localStorage.getItem("access_token");

  if (!user || !token) return <Navigate to="/dang-nhap" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}