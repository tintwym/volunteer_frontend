"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import dynamic from "next/dynamic";

const LandingApp = dynamic(() => import("@/design/landing/App"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-stone-900" />,
});

export default function LoginPage() {
  return (
    <>
      {/* Prototype: auth modal sits over the live landing page */}
      <div className="fixed inset-0 overflow-y-auto" aria-hidden>
        <LandingApp />
      </div>
      <AuthCard key="login" initialType="volunteer" variant="modal" />
    </>
  );
}
