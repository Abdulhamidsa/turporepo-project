import { RouteObject } from "react-router-dom";
import Auth from "./features/auth";
import ProfilePage from "./features/user/[username]/page";
import HomePage from "./page";
import Profile from "./features/user/components/profile";
import DashboardLayout from "./layout/DashboardLayout";

export const appRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />, // Auth Page (without dashboard)
  },
  {
    path: "/",
    element: <DashboardLayout />, // Dashboard Layout
    children: [
      {
        path: "/",
        element: <HomePage />, // Landing Page
      },
      {
        path: "users/:username",
        element: (
          <ProfilePage
            params={{
              username: "",
            }}
          />
        ),
      },
      {
        path: "profile",
        element: <Profile mongo_ref={""} />,
      },
    ],
  },
];
