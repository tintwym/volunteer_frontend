"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { RoleWorkspaceLoading } from "@/components/motion/RoleWorkspaceLoading";
import dynamic from "next/dynamic";

const VolunteerApp = dynamic(() => import("@/design/volunteer/App"), {
  ssr: false,
  loading: () => <RoleWorkspaceLoading label="volunteer workspace" />,
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
