"use client";

import { GeminiChatWidget } from "@/components/chat/GeminiChatWidget";
import type { ReactNode } from "react";

/** Shared shell for volunteer / leader / organizer dashboards. */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GeminiChatWidget />
    </>
  );
}
