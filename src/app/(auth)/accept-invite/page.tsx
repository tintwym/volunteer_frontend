"use client";

import { AcceptInviteForm } from "@/components/auth/AcceptInviteForm";
import {
  HeartHandshake,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LandingApp = dynamic(() => import("@/design/landing/App"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-stone-900" />,
});

export default function AcceptInvitePage() {
  return (
    <>
      <div className="fixed inset-0 overflow-y-auto" aria-hidden>
        <LandingApp />
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-center text-white sm:p-7">
            <Link
              href="/"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
              aria-label="Back to home"
            >
              <X className="h-5 w-5" />
            </Link>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md">
              <HeartHandshake className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-editorial text-2xl font-bold">
              Accept invitation
            </h1>
            <p className="mx-auto mt-1.5 max-w-xs text-xs text-emerald-100">
              Join as a volunteer leader or volunteer with your invite token.
            </p>
          </div>
          <div className="p-6">
            <AcceptInviteForm />
          </div>
        </div>
      </div>
    </>
  );
}
