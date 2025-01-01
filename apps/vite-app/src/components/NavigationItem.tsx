import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@repo/ui/components/ui/button";

import { NavigationItemProps } from "./Sidebar";

interface NavigationItemComponentProps {
  item: NavigationItemProps;
  isActive: boolean;
  showText: boolean;
}

const NavigationItem: React.FC<NavigationItemComponentProps> = ({ item, isActive, showText }) => {
  const baseClasses = "flex items-center px-5 py-3 text-sm font-medium rounded-lg transition-colors";
  const activeClasses = isActive ? "text-red-500 bg-muted/50" : "text-muted-foreground hover:bg-muted/50";

  if (item.link) {
    return (
      <Link to={item.link} className={`${baseClasses} ${activeClasses}`}>
        <item.icon className={`h-7 w-7 ${isActive ? "text-red-500" : "text-muted-foreground"}`} />
        {showText && <span className="ml-4">{item.name}</span>}
      </Link>
    );
  }

  return (
    <Button onClick={item.action} variant="ghost" className={`${baseClasses} hover:bg-muted/50`}>
      <item.icon className="h-6 w-6 text-muted-foreground" />
      {showText && <span className="ml-4">{item.name}</span>}
    </Button>
  );
};

export default NavigationItem;
