import { trustPoints } from "@/lib/data/seed/home";

export function TrustSection() {
  return (
    <section className="bg-brand-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <p className="text-brand-600 text-sm font-semibold">
              Why LocalServe
            </p>

            <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
              A clearer way to book local services
            </h2>

            <p className="text-text-secondary mt-5 leading-7">
              LocalServe brings service information, professional details,
              reviews and availability together so customers can make informed
              booking decisions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="border-brand-100 bg-surface rounded-2xl border p-6"
                >
                  <div className="bg-brand-50 text-brand-600 flex size-11 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="text-text-primary mt-5 font-semibold">
                    {point.title}
                  </h3>

                  <p className="text-text-secondary mt-2 text-sm leading-6">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
