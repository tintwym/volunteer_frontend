import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1800&auto=format&fit=crop&q=85"
          alt="Volunteers collaborating in a community kitchen"
          className="h-full w-full object-cover object-center brightness-[0.42] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/55" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-28 text-center sm:px-6">
        <p className="font-editorial text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          CommonGround
        </p>
        <h1 className="mt-5 max-w-2xl text-xl font-medium text-stone-100 sm:text-2xl">
          Make a difference. Be part of something bigger.
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-300 sm:text-lg">
          Organize events, lead teams, and track volunteer impact in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500"
          >
            Start as organizer
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
