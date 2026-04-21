import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!user) return <Navigate to="/dang-nhap" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}