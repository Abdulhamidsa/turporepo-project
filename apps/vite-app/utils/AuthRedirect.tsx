import { Navigate } from "react-router-dom";
import { useAuth } from "../src/features/user/hooks/use.auth";
import Auth from "../src/pages/auth";

export function AuthOrRedirect() {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticatedsdsdsdsd", isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Auth />;
}
