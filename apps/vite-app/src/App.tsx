import { Routes, Route } from "react-router-dom";
import Auth from "./features/auth";
import ProfilePage from "./features/user/[username]/page";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/users/:username"
        element={
          <ProfilePage
            params={{
              username: "woddddsooww",
            }}
          />
        }
      />
    </Routes>
  );
}
