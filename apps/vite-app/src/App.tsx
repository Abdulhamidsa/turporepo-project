// src/App.tsx
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../routes/appRoutes";
import { AuthProvider } from "../context/AuthContext";

function App() {
  const routing = useRoutes(appRoutes);

  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
