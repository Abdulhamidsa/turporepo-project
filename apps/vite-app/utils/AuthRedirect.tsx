import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Auth from "../src/features/auth";
import Loading from "@repo/ui/components/ui/Loading";

export function AuthOrRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Auth />;
}
