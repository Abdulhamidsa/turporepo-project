// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/UserContext";
// import Loading from "@repo/ui/components/ui/Loading";

// export function withAuth<T extends object>(Component: React.ComponentType<T>) {
//   return (props: T) => {
//     const { isAuthenticated, isLoading } = useAuth();

//     if (isLoading) {
//       return <Loading />;
//     }

//     if (!isAuthenticated) {
//       return <Navigate to="/auh" replace />;
//     }

//     return <Component {...props} />;
//   };
// }
