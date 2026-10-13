"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignOutButton({
  compact = false,
  tone = "light",
  className = "",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const router = useRouter();
  const { logout } = useAuth();

  const colors =
    tone === "dark"
      ? "text-slate-300 hover:text-rose-300 hover:bg-slate-800/80"
      : "text-slate-500 hover:text-rose-600 hover:bg-rose-50";

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        router.replace("/login");
      }}
      title="Sign out"
      aria-label="Sign out"
      className={`flex items-center gap-2 rounded-xl text-xs font-semibold transition-colors ${
        compact ? "justify-center p-2" : "w-full px-3 py-2"
      } ${colors} ${className}`}
    >
      <LogOut className="h-4 w-4 shrink-0" />
      {!compact && <span>Sign out</span>}
    </button>
  );
}
