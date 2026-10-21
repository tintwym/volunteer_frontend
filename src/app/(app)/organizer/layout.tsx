"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { RoleWorkspaceLoading } from "@/components/motion/RoleWorkspaceLoading";
import dynamic from "next/dynamic";

const OrganiserApp = dynamic(() => import("@/design/organiser/App"), {
  ssr: false,
  loading: () => <RoleWorkspaceLoading label="organizer workspace" />,
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
