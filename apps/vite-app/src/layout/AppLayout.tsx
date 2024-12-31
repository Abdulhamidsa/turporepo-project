import { Outlet } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
