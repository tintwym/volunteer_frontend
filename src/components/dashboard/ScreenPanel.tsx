export function ScreenPanel({
  title,
  description,
  bullets,
  role,
}: {
  title: string;
  description: string;
  bullets: string[];
  role: string;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {role}
        </p>
        <h1 className="mt-2 font-editorial text-3xl font-bold text-stone-900">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">{description}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {bullets.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-700"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-stone-400">
          UI shell from prototype navigation. Wire to Spring Boot APIs next.
        </p>
      </div>
    </div>
  );
}
