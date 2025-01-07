import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@repo/ui/components/ui/button";
import { AlertCircle } from "lucide-react";
import { NavigationItemProps } from "./Sidebar";

interface NavigationItemComponentProps {
  item: NavigationItemProps;
  attention: undefined;
  isActive: boolean;
  showText: boolean;
  onClick?: () => void;
}

const NavigationItem: React.FC<NavigationItemComponentProps> = ({ item, isActive, showText, onClick }) => {
  const baseClasses = "flex items-center px-5 py-3 text-sm font-medium rounded-lg transition-colors";
  const activeClasses = isActive ? " text-accent bg-muted/50" : "text-muted-foreground hover:bg-muted/50";

  const handleClick = () => {
    if (item.action) {
      item.action();
    }
    if (onClick) {
      onClick();
    }
  };

  const renderContent = () => (
    <>
      <item.icon className={`h-7 w-7 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
      {showText && <span className="ml-4 text-primary-foreground">{item.name}</span>}
      {item.attention && <AlertCircle className="ml-2 h-4 w-4 text-red-500" />}
    </>
  );

  if (item.link) {
    return (
      <Link to={item.link} className={`${baseClasses} ${activeClasses}`} onClick={handleClick}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <Button onClick={handleClick} variant="ghost" className={`${baseClasses} hover:bg-muted/50`}>
      {renderContent()}
    </Button>
  );
};

export default NavigationItem;
