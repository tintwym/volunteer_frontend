"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import type { ThemePreference } from "@/lib/theme";
import { Monitor, Moon, Sun } from "lucide-react";

const OPTIONS = [
  { id: "system" as const, label: "System", icon: Monitor, hint: "Match device" },
  { id: "light" as const, label: "Light", icon: Sun, hint: "Always light" },
  { id: "dark" as const, label: "Dark", icon: Moon, hint: "Always dark" },
];

type AppearancePickerProps = {
  title?: string;
  description?: string;
};

/** Compact light / dark / system picker for role portal settings screens. */
export function AppearancePicker({
  title = "Color Theme",
  description = "System follows your OS appearance and updates automatically.",
}: AppearancePickerProps) {
  const { theme, setTheme } = useTheme();

  const handleChange = (next: ThemePreference) => {
    setTheme(next);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700 dark:bg-slate-900">
      <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = theme === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleChange(option.id)}
              className={`rounded-xl border p-2.5 text-left transition-all ${
                selected
                  ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400 dark:border-emerald-500 dark:bg-emerald-950/50 dark:ring-emerald-500"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              }`}
            >
              <div className="mb-0.5 flex items-center gap-1.5">
                <Icon
                  className={`h-3.5 w-3.5 ${
                    selected
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                />
                <span
                  className={`text-xs font-bold ${
                    selected
                      ? "text-emerald-950 dark:text-emerald-100"
                      : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {option.label}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {option.hint}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">{description}</p>
    </div>
  );
}
