import { ArrowRight, CalendarCheck, Search, UsersRound } from "lucide-react";

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
      "Review professionals, services, ratings, prices, and availability.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Book",
    description:
      "Choose a convenient date and time, then confirm your appointment.",
    icon: CalendarCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-24">
      <div className="bg-brand-50 mx-auto max-w-7xl rounded-2xl pb-6">
        {/* Heading */}
        <div className="bg-brand-600 flex flex-col items-center rounded-t-2xl py-6 text-center">
          <h2 className="text-surface mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>

          <p className="text-brand-50 mt-4 text-base leading-7">
            LocalServe makes it easier to discover the right professional and
            schedule a service
          </p>
          <p className="text-brand-50 text-base leading-7">
            without unnecessary complexity.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="bg-brand-600 absolute top-12 right-[16.66%] left-[16.66%] hidden h-px lg:block"
          />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step icon */}
                  <div className="border-background bg-brand-100 text-brand-700 relative z-10 flex size-24 items-center justify-center rounded-full border-8">
                    <Icon className="size-8" />
                  </div>

                  {/* Number */}
                  <span className="text-brand-600 mt-6 text-xs font-bold tracking-[0.2em]">
                    STEP {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-text-primary mt-2 text-xl font-semibold">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary mt-3 max-w-48 text-sm leading-6">
                    {step.description}
                  </p>

                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="text-brand-500 mt-8 size-5 rotate-90 lg:hidden"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
