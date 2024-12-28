import { useEffect, useState } from "react";
import { Switch } from "@repo/ui/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-primary"}`} />
      <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className="bg-muted hover:bg-muted-foreground transition-colors" />
      <Moon className={`h-5 w-5 transition-colors ${isDarkMode ? "text-primary" : "text-muted-foreground"}`} />
    </div>
  );
}
