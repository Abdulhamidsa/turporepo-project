import { RouteObject } from "react-router-dom";
import ProfilePage from "../src/features/user/[username]/page";
// import HomePage from "../src/AddPostButton";
import Profile from "../src/features/user/components/profile";
import DashboardLayout from "../src/layout/DashboardLayout";
import Project from "../src/features/projects";
import Settings from "../src/features/user/components/Settings";
import { ProtectedRoute } from "./protectedRoutes";
import NotFound from "@repo/ui/components/ui/NotFound";
import { AuthOrRedirect } from "../utils/AuthRedirect";

export const appRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthOrRedirect />, // Public
  },
  {
    path: "/", // Apply protection here
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <HomePage />,
      // },
      {
        path: "users/:friendlyId",
        element: (
          <ProfilePage
            params={{
              friendlyId: "",
            }}
          />
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "projects",
        element: <Project />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />, // Catch-all 404 for protected children
      },
    ],
  },
  {
    path: "*", // Catch-all 404 for top-level unknown routes
    element: <NotFound />,
  },
];
