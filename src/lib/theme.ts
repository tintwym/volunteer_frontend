export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "cg_theme";
const LEGACY_DARK_KEY = "cg_dark_mode";

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

export function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  // Prefer OS theme going forward; drop the old boolean toggle key.
  localStorage.removeItem(LEGACY_DARK_KEY);
  return "system";
}

export function applyThemeClass(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function cycleTheme(current: ThemePreference): ThemePreference {
  if (current === "system") return "light";
  if (current === "light") return "dark";
  return "system";
}

/** Inline boot script — runs before paint to avoid theme flash. */
export const themeBootScript = `
(function(){
  try {
    var key = '${THEME_STORAGE_KEY}';
    var legacy = '${LEGACY_DARK_KEY}';
    var stored = localStorage.getItem(key);
    var pref;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      pref = stored;
    } else {
      localStorage.removeItem(legacy);
      pref = 'system';
    }
    var dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;
