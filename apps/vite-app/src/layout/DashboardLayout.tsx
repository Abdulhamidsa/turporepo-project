import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Profile", icon: User, link: "/profile" },
    { name: "Messages", icon: MessageSquare, link: "/messages" },
    { name: "My Portfolio", icon: Briefcase, link: "/users/:username" },
  ];

  const sidebarOnlyItems = [
    { name: "Settings", icon: Settings, action: () => alert("Go to Settings") },
    { name: "Logout", icon: LogOut, action: () => alert("Logging out...") },
  ];

  return (
    <div className="flex h-[100dvh] bg-background text-foreground">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-16 md:w-64" : "w-0"} hidden md:flex flex-col bg-card border-r border-border transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Navigation */}
          <nav className="px-2 md:px-4 mt-4">
            {navigationItems.map((item) => (
              <Link key={item.name} to={item.link} className="flex items-center justify-start px-2 py-3 text-sm font-medium rounded-lg hover:bg-muted/20 transition-colors">
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <span className="ml-4 hidden md:inline">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar-Only Items at the Bottom */}
        <div className="space-y-2 px-2 md:px-4 mb-4">
          {sidebarOnlyItems.map((item) => (
            <button key={item.name} onClick={item.action} className="flex items-center justify-start px-2 py-3 text-sm font-medium rounded-lg hover:bg-muted/20 transition-colors w-full">
              <item.icon className="h-6 w-6 text-muted-foreground" />
              <span className="ml-4 hidden md:inline">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block fixed bottom-4 left-52 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-50">
        {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">{children}</main>

      {/* Bottom Navigation for Smaller Screens */}
      <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-border flex justify-around py-2 md:hidden">
        {navigationItems.map((item) => (
          <Link key={item.name} to={item.link} className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}

        {/* Popover for Settings and Logout */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center text-muted-foreground hover:text-primary">
              <Settings className="h-6 w-6" />
              <span className="text-xs">More</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
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