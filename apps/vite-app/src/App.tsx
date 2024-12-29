import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import AppLayout from "./layout/AppLayout";

export default function App() {
  const routing = useRoutes(appRoutes);

  return <AppLayout>{routing}</AppLayout>;
}
