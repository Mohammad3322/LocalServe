import { Card } from "@heroui/react";
import { CalendarDays, Clock3 } from "lucide-react";

import type { Provider } from "@/lib/validation/provider.schema";
import type { Service } from "@/lib/validation/service.schema";
import MyButton from "../ui/MyButton";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";

type BookingSummaryProps = {
  provider: Provider;
  service: Service;
  selectedDate: string;
  selectedTime: string;
};

export function BookingSummary({
  provider,
  service,
  selectedDate,
  selectedTime,
}: BookingSummaryProps) {
  const router = useRouter();

  const setAppointment = useBookingStore((state) => state.setAppointment);

  const canContinue =
    Boolean(selectedDate) && Boolean(selectedTime) && Boolean(service);

  const handleContinue = () => {
    if (!service || !selectedDate || !selectedTime) {
      return;
    }

    setAppointment({
      providerId: provider.id,
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
    });

    router.push(`/book/${provider.id}/details`);
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <Card
        variant="default"
        className="border-border bg-surface border shadow-sm"
      >
        <Card.Content className="p-5 sm:p-6">
          <h2 className="text-text-primary text-lg font-semibold">
            Booking Summary
          </h2>

          <div className="border-border mt-5 border-b pb-5">
            <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
              Provider
            </p>

            <p className="text-text-primary mt-1 font-medium">
              {provider.name}
            </p>
          </div>

          <div className="border-border border-b py-5">
            <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
              Service
            </p>

            <p className="text-text-primary mt-1 font-medium">
              {service.title}
            </p>
          </div>

          <div className="border-border space-y-4 border-b py-5">
            <div className="flex items-start gap-3">
              <CalendarDays className="text-brand-600 mt-0.5 size-4 shrink-0" />

              <div>
                <p className="text-text-secondary text-xs">Date</p>

                <p className="text-text-primary mt-1 text-sm font-medium">
                  {selectedDate
                    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                        "en",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "Not selected"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="text-brand-600 mt-0.5 size-4 shrink-0" />

              <div>
                <p className="text-text-secondary text-xs">Time</p>

                <p className="text-text-primary mt-1 text-sm font-medium">
                  {selectedTime || "Not selected"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-5">
            <span className="text-text-secondary text-sm">Estimated price</span>

            <span className="text-text-primary font-semibold">
              €{(service.priceCents / 100).toFixed(0)}
            </span>
          </div>

          <MyButton
            variant="secondary"
            onPress={handleContinue}
            size="lg"
            className="w-full"
            isDisabled={!canContinue}
          >
            Continue
          </MyButton>

          <p className="text-text-secondary mt-3 text-center text-xs leading-5">
            You will review your details before confirming the booking.
          </p>
        </Card.Content>
      </Card>
    </aside>
  );
}
