import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  const { isAuth } = useAuth();
  const hasRefreshToken = localStorage.getItem("isAuth");

  return isAuth || hasRefreshToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
