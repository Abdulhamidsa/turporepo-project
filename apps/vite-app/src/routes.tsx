import { RouteObject } from "react-router-dom";
import Auth from "./features/auth";
import ProfilePage from "./features/user/[username]/page";
import AppLayout from "./layout/AppLayout";
import HomePage from "./page";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "users/:username",
        element: (
          <ProfilePage
            params={{
              username: "woddddsooww",
            }}
          />
        ),
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];