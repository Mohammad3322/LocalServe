import Link from "next/link";
import { Card } from "@heroui/react";
import { CalendarDays, Clock3 } from "lucide-react";

import { services } from "@/lib/data/seed/services";
import type { Provider } from "@/lib/validation/provider.schema";
import MyButton from "../ui/MyButton";

type ProviderBookingSidebarProps = {
  provider: Provider;
  selectedServiceId?: string;
};

export function ProviderBookingSidebar({
  provider,
  selectedServiceId,
}: ProviderBookingSidebarProps) {
  const selectedService = services.find(
    (service) =>
      service.id === selectedServiceId && service.providerId === provider.id,
  );

  return (
    <aside className="">
      <Card
        variant="default"
        className="border-border bg-brand-500 h-screen border shadow-sm lg:sticky lg:top-0"
      >
        <Card.Content className="p-5 sm:p-6">
          {selectedService ? (
            <>
              <div className="text-surface">
                <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                  Selected service
                </p>

                <h2 className="text-text-primary mt-2 text-lg font-semibold">
                  {selectedService.title}
                </h2>

                <p className="text-text-secondary mt-2 text-sm leading-6">
                  {selectedService.description}
                </p>
              </div>

              <div className="border-border mt-5 space-y-3 border-t pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-text-secondary flex items-center gap-2 text-sm">
                    <Clock3 className="size-4" />
                    <span>Duration</span>
                  </div>

                  <span className="text-text-primary text-sm font-medium">
                    {selectedService.durationMinutes} min
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-text-secondary flex items-center gap-2 text-sm">
                    <CalendarDays className="size-4" />
                    <span>Price</span>
                  </div>

                  <span className="text-text-primary text-sm font-semibold">
                    €{(selectedService.priceCents / 100).toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/book/${provider.id}?service=${selectedService.id}`}
                  className="block"
                >
                  <MyButton variant="primary" size="lg" className="w-full">
                    Continue
                  </MyButton>
                </Link>
              </div>

              <p className="text-text-secondary mt-3 text-center text-xs leading-5">
                You can review the appointment details before confirming your
                booking.
              </p>
            </>
          ) : (
            <>
              <div className="text-surface text-center">
                <div className="bg-brand-50 mx-auto flex size-12 items-center justify-center rounded-full">
                  <CalendarDays className="text-brand-600 size-5" />
                </div>

                <h2 className="text-surface mt-4 font-semibold">
                  Choose a service to continue booking
                </h2>

                <p className="text-surface mt-2 text-sm leading-6">
                  Select one of the services below to view availability and
                  continue with your booking.
                </p>
              </div>

              <div className="mt-6">
                <Link href="#services" className="block">
                  <MyButton variant="secondary" size="lg" className="w-full">
                    Choose a Service
                  </MyButton>
                </Link>
              </div>
            </>
          )}
        </Card.Content>
      </Card>
    </aside>
  );
}
