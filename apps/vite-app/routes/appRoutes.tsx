import { RouteObject } from "react-router-dom";
import ProfilePage from "../src/pages/[username]/profile";
import ProfileInfo from "../src/pages/profileInfo";
import DashboardLayout from "../src/layout/DashboardLayout";
import Settings from "../src/pages/settings";
import { ProtectedRoute } from "./protectedRoutes";
import NotFound from "@repo/ui/components/NotFound";
import { AuthOrRedirect } from "../utils/AuthRedirect";
// import HomePage from "../src/pages/feesds";
import { routesConfig } from "./routesConfig";
import Feed from "../src/pages/feed";

export const appRoutes: RouteObject[] = [
  {
    path: routesConfig.auth,
    element: <AuthOrRedirect />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: routesConfig.home,
        element: <Feed />,
      },
      {
        path: routesConfig.feed,
        element: <Feed />,
      },

      {
        path: routesConfig.userPortfolio(":friendlyId"),
        element: <ProfilePage />,
      },
      {
        path: routesConfig.profile,
        element: <ProfileInfo />,
      },

      {
        path: routesConfig.settings,
        element: <Settings />,
      },
    ],
  },
  {
    path: "*", // Catch-all 404 for top-level unknown routes
    element: <NotFound />,
  },
];
