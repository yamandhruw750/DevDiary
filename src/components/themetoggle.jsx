import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/themeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-90" : "rotate-0"}`}
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-400 rotate-0 transition-all" />
      ) : (
        <Moon className="h-6 w-6 text-blue-400 rotate-0 transition-all" />
      )}
    </div>
  );
}
