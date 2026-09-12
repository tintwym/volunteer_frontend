"use client";

import dynamic from "next/dynamic";

const LandingApp = dynamic(() => import("@/design/landing/App"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-500">
      Loading CommonGround…
    </div>
  ),
});

export default function HomePage() {
  return <LandingApp />;
}
