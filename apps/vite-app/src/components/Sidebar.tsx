// src/components/Dashboard/Sidebar/Sidebar.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";

type loggedInUser = {
  username: string;
  friendlyId: string;
};
interface SidebarProps {
  isOpen: boolean;
  navigationItems: NavigationItemProps[];
  sidebarOnlyItems: NavigationItemProps[];
  userInfo: loggedInUser;
}

export interface NavigationItemProps {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link?: string;
  action?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, navigationItems, sidebarOnlyItems, userInfo }) => {
  const location = useLocation();

  const renderNavItem = (item: NavigationItemProps, showText = true) => {
    const isActive = item.link ? location.pathname === item.link : false;

    return <NavigationItem key={item.name} item={item} isActive={isActive} showText={showText} />;
  };

  return (
    <aside className={`absolute top-0 left-0 z-30 h-full bg-card border-r border-border transition-transform duration-300 ${isOpen ? "translate-x-0 w-64" : "-translate-x-full"}`}>
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <div className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <nav className="px-4 mt-4 space-y-2">{navigationItems.map((item) => renderNavItem(item))}</nav>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <p className="text-sm font-semibold">{userInfo.friendlyId}</p>
            <p className="text-xs text-muted-foreground">View Profile</p>
          </div>
        </div>

        {/* Sidebar Only Items */}
        <div className={`space-y-2 px-4 mb-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>{sidebarOnlyItems.map((item) => renderNavItem(item))}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
