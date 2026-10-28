/**
 * CommonGround product brand tokens — keep in sync with brand/colors.json,
 * Android Color.kt, and iOS AppColors.swift.
 * Landing pages may keep stone neutrals outside `.cg-role-portal`.
 */
export const brandColors = {
  light: {
    primary: "#059669",
    primaryStrong: "#047857",
    primarySoft: "#10B981",
    primaryContainer: "#D1FAE5",
    onPrimaryContainer: "#064E3B",
    canvas: "#F4F7F5",
    surface: "#FFFFFF",
    surfaceMuted: "#ECF3EF",
    surfaceVariant: "#E4EDE8",
    border: "#D3E0D9",
    hairline: "#C5D4CB",
    textPrimary: "#0C1A14",
    textSecondary: "#5B6B63",
    textTertiary: "#84948B",
    danger: "#DC2626",
    amber: "#D97706",
  },
  dark: {
    primary: "#34D399",
    primaryStrong: "#6EE7B7",
    primaryContainer: "#065F46",
    onPrimaryContainer: "#D1FAE5",
    canvas: "#0B1411",
    surface: "#15201C",
    surfaceElevated: "#1F2E28",
    border: "#2A3B34",
    textPrimary: "#F8FAFC",
    textSecondary: "#CBD5E1",
    danger: "#F87171",
  },
} as const;
