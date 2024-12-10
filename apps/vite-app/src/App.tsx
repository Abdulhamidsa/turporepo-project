import { Routes, Route } from "react-router-dom";
import Auth from "./features/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
