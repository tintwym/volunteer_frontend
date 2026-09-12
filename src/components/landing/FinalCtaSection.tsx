import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="border-t border-stone-200 bg-stone-900 py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-editorial text-3xl font-bold sm:text-4xl">
          Ready to grow your volunteer community?
        </h2>
        <p className="mt-3 text-stone-300">
          Create your organization in minutes. Invite leaders and volunteers when
          you&apos;re ready.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Create organization
        </Link>
      </div>
    </section>
  );
}
