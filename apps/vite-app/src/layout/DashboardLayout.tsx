import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Home, User, Settings, LogOut, ChevronLeft, ChevronRight, Briefcase, MoreVertical } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const username = "currentUser"; // Replace with dynamic username

  const navigationItems = [
    { name: "Home", icon: Home, link: "/" },
    // { name: "Messages", icon: MessageSquare, link: "/messages" },
    { name: "My Portfolio", icon: Briefcase, link: `/users/${username}` },
  ];

  const sidebarOnlyItems = [
    { name: "Profile", icon: User, link: "/profile" },
    { name: "Settings", icon: Settings, action: () => alert("Go to Settings") },
    { name: "Logout", icon: LogOut, action: () => handleLogout() },
  ];

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="flex h-[100dvh] bg-background text-foreground">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-16 md:w-52" : "w-0"} hidden md:flex flex-col bg-card border-r border-border transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 md:px-4 mt-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.name} to={item.link} className={`flex items-center justify-start px-2 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? "bg-muted/20 text-primary" : "hover:bg-muted/20"}`}>
                  <item.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-4 hidden md:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="space-y-2 px-2 md:px-4 mb-4">
          {sidebarOnlyItems.map((item) =>
            item.link ? (
              <Link key={item.name} to={item.link} className="flex items-center justify-start px-2 py-3 text-sm font-medium rounded-lg hover:bg-muted/20 transition-colors w-full">
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <span className="ml-4 hidden md:inline">{item.name}</span>
              </Link>
            ) : (
              <button key={item.name} onClick={item.action} className="flex items-center justify-start px-2 py-3 text-sm font-medium rounded-lg hover:bg-muted/20 transition-colors w-full">
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <span className="ml-4 hidden md:inline">{item.name}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Sidebar Toggle */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`hidden md:block fixed bottom-4 ${isSidebarOpen ? "left-48" : "left-4"} bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-50 transition-all duration-300`}>
        {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-border flex justify-around items-center py-2 md:hidden">
        {navigationItems.map((item) => (
          <Link key={item.name} to={item.link} className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-all">
              <MoreVertical className="h-6 w-6" />
              <span className="text-xs">More</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-card border border-border rounded-lg shadow-md">
            {sidebarOnlyItems.map((item) => (
              <button key={item.name} onClick={item.action} className={`flex items-center w-full px-4 py-2 text-sm ${item.name === "Logout" ? "text-destructive" : "text-muted-foreground"} hover:bg-muted/20 rounded-lg`}>
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
}
