"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeCycleButtonProps = {
  className?: string;
  /** Icon size classes */
  iconClassName?: string;
};

/**
 * Cycles system → light → dark. Shared by landing + role portal navbars.
 */
export function ThemeCycleButton({
  className = "rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
  iconClassName = "h-5 w-5",
}: ThemeCycleButtonProps) {
  const { theme, cycleThemePreference, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleThemePreference}
      className={className}
      title={
        theme === "system"
          ? "Theme: System (click for Light)"
          : theme === "light"
            ? "Theme: Light (click for Dark)"
            : "Theme: Dark (click for System)"
      }
      aria-label={`Color theme: ${theme}. Click to change.`}
    >
      {theme === "system" ? (
        <Monitor className={`${iconClassName} text-emerald-600 dark:text-emerald-400`} />
      ) : isDark ? (
        <Sun className={`${iconClassName} text-amber-400`} />
      ) : (
        <Moon className={iconClassName} />
      )}
    </button>
  );
}
