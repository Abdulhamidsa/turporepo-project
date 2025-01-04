import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";
import Overlay from "../components/OverlayComponent";
import BottomNavigation from "../components/BottomNavigation";
import { Briefcase, Home, Settings, User } from "lucide-react";
import { useUserProfile } from "../features/user/hooks/use.user.profile";
import { Navbar } from "./Navbar";
import { routesConfig } from "../../routes/routesConfig";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userProfile } = useUserProfile();

  const navigationItems = [
    { name: "Home", icon: Home, link: routesConfig.home },
    {
      name: "My Portfolio",
      icon: Briefcase,
      link: userProfile?.username ? routesConfig.userPortfolio(userProfile.username) : routesConfig.home,
    },
    { name: "Profile", icon: User, link: routesConfig.profile },
  ];

  const sidebarOnlyItems = [{ name: "Settings", icon: Settings, link: routesConfig.settings }];

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
    <div className="relative h-screen bg-background text-foreground overflow-y-scroll">
      <Navbar />
      <SidebarToggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} onClose={toggleSidebar} />
      <Overlay isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <main className="flex-1 max-w-screen-lg m-auto p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
      <BottomNavigation navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} />
    </div>
  );
};

export default DashboardLayout;
