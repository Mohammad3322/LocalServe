import { CalendarCheck, Search, Scale } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Search",
    description: "Tell us what service you need and where you need it.",
    icon: Search,
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Review providers, services, ratings, prices and availability.",
    icon: Scale,
  },
  {
    number: "03",
    title: "Book",
    description:
      "Choose a suitable service and appointment time, then confirm.",
    icon: CalendarCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-brand-600 text-sm font-semibold">Simple process</p>

          <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
            How it works
          </h2>

          <p className="text-text-secondary mt-4">
            From finding a professional to confirming your appointment in just a
            few simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="border-border bg-background relative rounded-2xl border p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-brand-50 text-brand-600 flex size-12 items-center justify-center rounded-xl">
                    <Icon className="size-6" />
                  </div>

                  <span className="text-border text-4xl font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-text-primary mt-6 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="text-text-secondary mt-3 text-sm leading-6">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
