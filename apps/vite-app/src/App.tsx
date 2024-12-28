import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  const routing = useRoutes(appRoutes);

  return <DashboardLayout>{routing}</DashboardLayout>;
}
