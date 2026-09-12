"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import dynamic from "next/dynamic";

const OrganiserApp = dynamic(() => import("@/design/organiser/App"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
      Loading organizer workspace…
    </div>
  ),
});

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prototype app owns all organizer screens via internal tabs.
  void children;
  return (
    <RequireAuth role="ORGANIZER">
      <OrganiserApp />
    </RequireAuth>
  );
}
