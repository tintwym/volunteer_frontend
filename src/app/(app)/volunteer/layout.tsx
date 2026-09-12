"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import dynamic from "next/dynamic";

const VolunteerApp = dynamic(() => import("@/design/volunteer/App"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
      Loading volunteer workspace…
    </div>
  ),
});

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  void children;
  return (
    <RequireAuth role="VOLUNTEER">
      <VolunteerApp />
    </RequireAuth>
  );
}
