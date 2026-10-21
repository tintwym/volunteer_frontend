"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { RoleWorkspaceLoading } from "@/components/motion/RoleWorkspaceLoading";
import dynamic from "next/dynamic";

const LeaderApp = dynamic(() => import("@/design/leader/App"), {
  ssr: false,
  loading: () => <RoleWorkspaceLoading label="leader workspace" />,
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
