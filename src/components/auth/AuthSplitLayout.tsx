"use client";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { FadeIn } from "@/components/motion/ui";
import { CalendarCheck, Clock, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthSplitLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const HIGHLIGHTS = [
  { icon: Users, label: "Manage volunteers and leaders in one place" },
  { icon: CalendarCheck, label: "Schedule shifts and track attendance" },
  { icon: Clock, label: "Log and verify community service hours" },
];

export function AuthSplitLayout({ title, subtitle, children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-900 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[28rem] w-[28rem] rounded-full bg-white/5" />

        <Link href="/" className="relative flex items-center gap-3 transition-opacity hover:opacity-90">
          <BrandLogo size={40} className="bg-white" priority />
          <span className="font-editorial text-xl font-black tracking-tight">
            CommonGround
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-editorial text-4xl font-bold leading-tight">
            Volunteer management, made simple.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-emerald-100">
            One workspace for organizers, leaders and volunteers to coordinate
            events, shifts and service hours.
          </p>
          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-emerald-200">
          © {new Date().getFullYear()} CommonGround. All rights reserved.
        </p>
      </aside>

      <main className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <FadeIn className="w-full max-w-sm" y={12}>
          <Link href="/" className="mb-10 flex items-center gap-2 transition-opacity hover:opacity-90 lg:hidden">
            <BrandLogo size={36} priority />
            <span className="font-editorial text-lg font-black tracking-tight text-stone-900">
              CommonGround
            </span>
          </Link>

          <h1 className="text-2xl font-semibold text-stone-900">{title}</h1>
          <p className="mt-1.5 text-sm text-stone-500">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </FadeIn>
      </main>
    </div>
  );
}
