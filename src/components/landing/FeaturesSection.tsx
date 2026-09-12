const features = [
  {
    title: "Organize with clarity",
    body: "Create events, assign leaders, and manage shifts across your organization.",
  },
  {
    title: "Lead in the field",
    body: "Volunteer leaders coordinate teams, attendance, and day-of operations.",
  },
  {
    title: "Volunteer with purpose",
    body: "Discover opportunities, log hours, earn recognition, and stay connected.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,_#ecfdf5,_#fafaf9_45%,_#f5f5f4)] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-editorial text-3xl font-bold text-stone-900 sm:text-4xl">
          Built for every role
        </h2>
        <p className="mt-3 max-w-2xl text-stone-600">
          One platform for organizers, volunteer leaders, and volunteers — with
          the right tools for each.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-lg font-semibold text-stone-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
