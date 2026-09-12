import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-editorial text-2xl font-bold text-white">
          CommonGround
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Create organization
          </Link>
        </nav>
      </div>
    </header>
  );
}
