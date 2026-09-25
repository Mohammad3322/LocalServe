import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { getProviderAvailability } from "@/lib/services/availability";
import MyButton from "../ui/MyButton";

type ProviderAvailabilityProps = {
  providerId: string;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function ProviderAvailability({
  providerId,
}: ProviderAvailabilityProps) {
  const availableSlots = getProviderAvailability({ providerId });

  return (
    <section id="availability" className="border-border border-b py-12">
      <div>
        <div>
          <h2 className="text-text-primary text-2xl font-semibold">
            Availability
          </h2>

          <p className="text-text-secondary mt-2 text-sm">
            Preview the next available appointment times.
          </p>
        </div>

        {availableSlots.length > 0 ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {availableSlots.map((slot) => (
                <Card
                  key={slot.id}
                  variant="default"
                  className="border-border bg-surface border shadow-sm"
                >
                  <Card.Content className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-50 flex size-11 shrink-0 items-center justify-center rounded-full">
                        <CalendarDays className="text-brand-600 size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-text-primary font-semibold">
                          {formatDate(slot.date)}
                        </p>

                        <div className="text-text-secondary mt-2 flex items-center gap-2 text-sm">
                          <Clock3 className="size-4" />
                          <span>{slot.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Link href={`/book/${providerId}`}>
                <MyButton variant="secondary" size="lg" className="">
                  View Full Availability
                  <ArrowRight className="size-4" />
                </MyButton>
              </Link>
            </div>
          </>
        ) : (
          <div className="border-border bg-surface mt-6 rounded-xl border p-8 text-center">
            <div className="bg-brand-50 mx-auto flex size-12 items-center justify-center rounded-full">
              <CalendarDays className="text-brand-600 size-5" />
            </div>

            <h3 className="text-text-primary mt-4 font-semibold">
              No availability right now
            </h3>

            <p className="text-text-secondary mx-auto mt-2 max-w-md text-sm leading-6">
              There are currently no available appointment times for this
              professional.
            </p>

            <div className="mt-5">
              <Link href={`/book/${providerId}`}>
                <MyButton variant="secondary">Check Availability</MyButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
