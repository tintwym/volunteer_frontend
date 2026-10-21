"use client";

import { RoleWorkspaceLoading } from "@/components/motion/RoleWorkspaceLoading";
import dynamic from "next/dynamic";

const LandingApp = dynamic(() => import("@/design/landing/App"), {
  ssr: false,
  loading: () => <RoleWorkspaceLoading label="CommonGround" />,
});

export default function HomePage() {
  return <LandingApp />;
}
