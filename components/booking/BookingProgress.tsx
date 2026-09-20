type BookingProgressProps = {
  currentStep: number;
};

const steps = [
  {
    number: 1,
    label: "Service",
  },
  {
    number: 2,
    label: "Date & Time",
  },
  {
    number: 3,
    label: "Your Details",
  },
  {
    number: 4,
    label: "Review",
  },
];

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <nav aria-label="Booking progress" className="mb-10">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;

          const isCurrent = step.number === currentStep;

          return (
            <li key={step.number} className="flex flex-1 items-center">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    isCurrent
                      ? "bg-brand-600 text-white"
                      : isCompleted
                        ? "bg-brand-100 text-brand-700"
                        : "bg-surface text-text-secondary ring-border ring-1",
                  ].join(" ")}
                >
                  {step.number}
                </span>

                <span
                  className={[
                    "hidden text-sm sm:block",
                    isCurrent || isCompleted
                      ? "text-text-primary font-medium"
                      : "text-text-secondary",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-3 h-px flex-1",
                    isCompleted ? "bg-brand-500" : "bg-border",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
