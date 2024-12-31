import React from "react";
import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/guest" />;
};

export default ProtectedRoute;
