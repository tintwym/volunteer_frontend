"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { NavSection } from "@/lib/navigation";
import { HeartHandshake, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function AppShell({
  title,
  nav,
  children,
}: {
  title: string;
  nav: NavSection[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-stone-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center gap-2 border-b border-stone-100 px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="font-editorial text-lg font-semibold leading-none">
                CommonGround
              </p>
              <p className="text-xs text-stone-500">{title}</p>
            </div>
          </div>

          <nav className="h-[calc(100%-8rem)] space-y-6 overflow-y-auto px-3 py-4">
            {nav.map((section) => (
              <div key={section.group}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  {section.group}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== nav[0].items[0].href &&
                        pathname.startsWith(item.href));
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`block rounded-lg px-3 py-2 text-sm transition ${
                            active
                              ? "bg-emerald-50 font-semibold text-emerald-800"
                              : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-stone-100 p-4">
            <p className="truncate text-sm font-medium">{user?.fullName}</p>
            <p className="truncate text-xs text-stone-500">{user?.email}</p>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="mt-3 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-stone-900/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-stone-200 bg-white/90 px-4 backdrop-blur lg:px-8">
            <button
              type="button"
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm text-stone-500">
                {user?.organizationName ?? "Organization"}
              </p>
              <p className="truncate font-medium">
                {user?.role?.replaceAll("_", " ") ?? ""}
              </p>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
