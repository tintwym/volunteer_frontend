"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import dynamic from "next/dynamic";

const LeaderApp = dynamic(() => import("@/design/leader/App"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
      Loading leader workspace…
    </div>
  ),
});

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  void children;
  return (
    <RequireAuth role="VOLUNTEER_LEADER">
      <LeaderApp />
    </RequireAuth>
  );
}
