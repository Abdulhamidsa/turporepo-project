import { Navigate } from "react-router-dom";
import { useAuth } from "../src/features/user/hooks/use.auth";
import Auth from "../src/features/auth";

export function AuthOrRedirect() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Auth />;
}
