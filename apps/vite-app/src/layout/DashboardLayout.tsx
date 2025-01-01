import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";
import Overlay from "../components/OverlayComponent";
import BottomNavigation from "../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import { Briefcase, Home, LogOut, Settings, User } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const { signOut, loggedUser } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "My Portfolio", icon: Briefcase, link: `/users/${loggedUser?.friendlyId}` },
    { name: "Profile", icon: User, link: "/profile" },
  ];

  const sidebarOnlyItems = [
    { name: "Settings", icon: Settings, link: "/settings" },
    { name: "Logout", icon: LogOut, action: () => signOut() },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} userInfo={loggedUser} navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} />

      {/* Sidebar Toggle */}
      <SidebarToggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay */}
      <Overlay isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 max-w-screen-lg m-auto p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation (Phone View) */}
      <BottomNavigation navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} />
    </div>
  );
};

export default DashboardLayout;
