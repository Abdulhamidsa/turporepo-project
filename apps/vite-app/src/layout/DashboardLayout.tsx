import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";
import Overlay from "../components/OverlayComponent";
import BottomNavigation from "../components/BottomNavigation";
import { useAuth } from "../features/user/hooks/use.auth";
import AddPostButton from "../AddPostButton";
import { Briefcase, Home, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@repo/ui/components/ui/dropdown-menu";
import { useUserProfile } from "../features/user/hooks/use.user.profile";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { AddContentButton } from "../features/user/components/add-content-button";
import AddProjectModal from "../features/projects/components/addProjectModal";

const DashboardLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userProfile } = useUserProfile();

  const navigationItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "My Portfolio", icon: Briefcase, link: `/users/${userProfile?.username}` },
    { name: "Profile", icon: User, link: "/profile" },
  ];

  const sidebarOnlyItems = [{ name: "Settings", icon: Settings, link: "/settings" }];

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
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-5 bg-card shadow-md">
        <div className="flex items-center space-x-2">
          <SidebarToggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <AddPostButton />
        </div>

        <div className="flex items-center space-x-4">
          {/* Welcome Message */}
          <div className="hidden md:block text-right">
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="text-lg font-semibold text-primary">{userProfile?.username || "User"}!</p>
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 rounded-full hover:bg-muted p-2 transition focus-visible:ring">
                <Avatar>{userProfile?.profilePicture ? <AvatarImage src={userProfile.profilePicture} alt={userProfile?.username || "User avatar"} /> : <AvatarFallback>{userProfile?.username?.charAt(0)}</AvatarFallback>}</Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-card text-card-foreground rounded-lg shadow-lg">
              <DropdownMenuLabel className="text-muted-foreground">Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} onClose={toggleSidebar} />

      {/* Overlay */}
      <Overlay isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 max-w-screen-lg m-auto p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
      <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Bottom Navigation (Phone View) */}
      <BottomNavigation navigationItems={navigationItems} sidebarOnlyItems={sidebarOnlyItems} />
    </div>
  );
};

export default DashboardLayout;
