"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { dashboardPathForRole, isRole, type Role } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({
  role,
  children,
}: {
  role?: Role | Role[];
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || !isRole(user.role)) {
      logout();
      router.replace("/login");
      return;
    }

    if (role) {
      const allowed = Array.isArray(role) ? role : [role];
      if (!allowed.includes(user.role)) {
        router.replace(dashboardPathForRole(user.role));
      }
    }
  }, [user, loading, role, router, logout]);

  if (loading || !user || !isRole(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-500">
        Loading…
      </div>
    );
  }

  if (role) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(user.role)) return null;
  }

  return <>{children}</>;
}
