import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, User, Settings, LogOut, ChevronLeft, ChevronRight, Briefcase, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover";
import { Button } from "@repo/ui/components/ui/button";
import { getErrorMessage, request } from "../../utils/axiosConfige";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = "ass"; // Replace with dynamic user info

  const navigationItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "My Portfolio", icon: Briefcase, link: `/users/${userInfo}` },
    { name: "Profile", icon: User, link: "/profile" },
  ];

  const sidebarOnlyItems = [
    { name: "Settings", icon: Settings, link: "/settings" },
    { name: "Logout", icon: LogOut, action: () => handleLogout() },
  ];

  const handleLogout = async () => {
    try {
      await request<undefined>("POST", "/internal/signout");
      navigate("/auth");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(`Logout failed: ${errorMessage}`);
    }
  };

  const renderNavItem = (item, showText = true) => {
    const isActive = location.pathname === item.link; // Check if the link is active
    const baseClasses = `flex items-center px-5 py-3 text-sm font-medium rounded-lg transition-colors`;
    const activeClasses = isActive ? "text-red-500 bg-muted/50" : "text-muted-foreground hover:bg-muted/50"; // Active link is red

    return item.link ? (
      <Link key={item.name} to={item.link} className={`${baseClasses} ${activeClasses}`}>
        <item.icon className={`h-7 w-7 ${isActive ? "text-red-500" : "text-muted-foreground"}`} />
        {showText && <span className="ml-4">{item.name}</span>}
      </Link>
    ) : (
      <button key={item.name} onClick={item.action} className={`${baseClasses} hover:bg-muted/50`}>
        <item.icon className="h-6 w-6 text-muted-foreground" />
        {showText && <span className="ml-4">{item.name}</span>}
      </button>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={`absolute top-0 left-0 z h-full bg-card border-r border-border transition-transform duration-300 ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <div className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <nav className="px-4 mt-4 space-y-2">{navigationItems.map((item) => renderNavItem(item))}</nav>
          </div>

          {/* Sidebar Only Items */}
          <div className={`space-y-2 px-4 mb-4 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>{sidebarOnlyItems.map((item) => renderNavItem(item))}</div>
        </div>
      </aside>

      {/* Sidebar Toggle */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`fixed bottom-4 ${isSidebarOpen ? "left-64" : "left-4"} bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-50 transition-all duration-300 md:block hidden`}>
        {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="absolute inset-0 bg-black/50 z-40 md:hidden"></div>}

      {/* Main Content */}
      <main className="flex-1 max-w-screen-lg m-auto p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation (Phone View) */}
      <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-border flex justify-between items-center md:hidden">
        <div className="flex justify-center gap-10 flex-grow">{navigationItems.map((item) => renderNavItem(item, false))}</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="ml-auto flex flex-col items-center">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-card border border-border rounded-lg shadow-md">{sidebarOnlyItems.map((item) => renderNavItem(item))}</PopoverContent>
        </Popover>
      </nav>
    </div>
  );
}
