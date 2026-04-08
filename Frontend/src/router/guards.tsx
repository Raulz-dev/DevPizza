import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function hasSession(token: string | null) {
  if (token) return true;
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("token"));
}

export function RootRedirect() {
  const { token } = useAuth();
  return <Navigate to={hasSession(token) ? "/mesas" : "/login"} replace />;
}

export function PublicRoute() {
  const { token } = useAuth();
  return hasSession(token) ? <Navigate to="/mesas" replace /> : <Outlet />;
}

export function ProtectedRoute() {
  const { token } = useAuth();
  return hasSession(token) ? <Outlet /> : <Navigate to="/login" replace />;
}
