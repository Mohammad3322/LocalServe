"use client";

import Link from "next/link";
import { Calendar, Card } from "@heroui/react";
import { Clock3, NotepadTextIcon } from "lucide-react";
import { useState, useEffect } from "react";

import { getAvailability } from "@/lib/api/availability";
import type { AvailabilitySlot } from "@/lib/validation/availability.schema";

import type { Provider } from "@/lib/validation/provider.schema";
import { BookingSummary } from "./BookingSummary";
import { formatDateToString } from "@/lib/utils/formatters";
import type { DateValue } from "@internationalized/date";
import { TimeSlot } from "../ui/TimeSlot";
import { getProviderServices } from "@/lib/services/providerServices";
import MyButton from "../ui/MyButton";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";

type BookingDateTimeProps = {
  provider: Provider;
  selectedServiceId?: string;
};

export function BookingDateTime({
  provider,
  selectedServiceId,
}: BookingDateTimeProps) {
  const providerServices = getProviderServices(provider.id);

  const selectedService = providerServices.find(
    (service) =>
      service.id === selectedServiceId && service.providerId === provider.id,
  );

  const [providerSlots, setProviderSlots] = useState<AvailabilitySlot[]>([]);

  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  const [availabilityError, setAvailabilityError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadAvailability = async () => {
      setIsLoadingAvailability(true);
      setAvailabilityError(false);

      try {
        const slots = await getAvailability({
          providerId: provider.id,
          serviceId: selectedServiceId,
        });

        if (!cancelled) {
          setProviderSlots(slots);
        }
      } catch {
        if (!cancelled) {
          setProviderSlots([]);
          setAvailabilityError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAvailability(false);
        }
      }
    };

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [provider.id, selectedServiceId]);

  const [selectedDate, setSelectedDate] = useState<DateValue | undefined>(
    undefined,
  );

  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = providerSlots.filter(
    (slot) => slot.date === formatDateToString(selectedDate),
  );

  const availableTimeSlots = timeSlots.filter((slot) => slot.available);

  const availableDatesSet = new Set(
    providerSlots.filter((slot) => slot.available).map((slot) => slot.date),
  );

  const hasAvailableSlots = availableDatesSet.size > 0;

  const isDateUnavailable = (date: DateValue) => {
    const dateString = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
    return !availableDatesSet.has(dateString);
  };

  const router = useRouter();

  const setAppointment = useBookingStore((state) => state.setAppointment);

  const canContinue =
    Boolean(selectedDate) && Boolean(selectedTime) && Boolean(selectedService);

  const handleContinue = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      return;
    }

    setAppointment({
      providerId: provider.id,
      serviceId: selectedService.id,
      date: formatDateToString(selectedDate),
      time: selectedTime,
    });

    router.push(`/book/${provider.id}/details`);
  };

  const backUrl = `/book/${provider.id}`;

  if (!selectedService) {
    return (
      <Card
        variant="default"
        className="border-border bg-surface border shadow-sm"
      >
        <Card.Content className="p-6">
          <h1 className="text-text-primary text-xl font-semibold">
            Select a service first
          </h1>

          <p className="text-text-secondary mt-2 text-sm">
            Please choose a service before selecting a date and time.
          </p>

          <div className="mt-5">
            <Link href={`/providers/${provider.slug}#services`}>
              <MyButton variant="primary">Choose a Service</MyButton>
            </Link>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-text-primary text-2xl font-semibold sm:text-3xl">
          Choose a Date & Time
        </h1>

        <p className="text-text-secondary mt-2 text-sm">
          Select an available appointment time for your service.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Selected Service */}
          <Card
            variant="default"
            className="border-border bg-surface w-full border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                    Selected service
                  </p>

                  <h2 className="text-text-primary mt-2 font-semibold">
                    {selectedService.title}
                  </h2>
                </div>

                <Link
                  href={`/providers/${provider.slug}#services`}
                  className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                >
                  Change
                </Link>
              </div>

              <div className="text-text-secondary mt-4 flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" />
                  {selectedService.durationMinutes} min
                </span>

                <span>
                  From €{(selectedService.priceCents / 100).toFixed(0)}
                </span>
              </div>
            </Card.Content>
          </Card>

          {/* Date Selection */}
          {isLoadingAvailability ? (
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-6">
                <p className="text-text-secondary text-sm">
                  Loading available dates...
                </p>
              </Card.Content>
            </Card>
          ) : availabilityError ? (
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-6">
                <h2 className="text-text-primary font-semibold">
                  Availability unavailable
                </h2>

                <p className="text-text-secondary mt-2 text-sm">
                  We couldn&apos;t load the available dates and times.
                </p>
              </Card.Content>
            </Card>
          ) : !hasAvailableSlots ? (
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-6">
                <div className="border-warning/30 bg-warning/5 rounded-xl border p-5">
                  <h2 className="text-text-primary font-semibold">
                    Sorry, no available times right now
                  </h2>

                  <p className="text-text-secondary mt-2 text-sm leading-6">
                    There are currently no available appointment times for this
                    professional. Please check again later.
                  </p>
                </div>
              </Card.Content>
            </Card>
          ) : (
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="text-info-600 flex gap-3 lg:w-50">
                <NotepadTextIcon />

                <p>
                  Notes: Available days are marked with a dot on the calendar.
                </p>
              </div>

              <Calendar
                aria-label="Booking date"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                isDateUnavailable={isDateUnavailable}
                className="border-border/80 bg-surface ring-accent/5 dark:border-border/90 dark:ring-accent/10 w-63 rounded-2xl border p-3 shadow-sm ring-1"
              >
                <Calendar.Header className="px-0.5 pb-4">
                  <Calendar.Heading className="text-foreground text-sm font-medium" />

                  <Calendar.NavButton
                    className="text-accent-soft-foreground hover:bg-default hover:text-accent-soft-foreground active:scale-95"
                    slot="previous"
                  />

                  <Calendar.NavButton
                    className="text-accent-soft-foreground hover:bg-default hover:text-accent-soft-foreground active:scale-95"
                    slot="next"
                  />
                </Calendar.Header>

                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => (
                      <Calendar.HeaderCell className="text-muted pb-2 text-xs font-medium">
                        {day}
                      </Calendar.HeaderCell>
                    )}
                  </Calendar.GridHeader>

                  <Calendar.GridBody>
                    {(date) => (
                      <Calendar.Cell date={date}>
                        {({ formattedDate, isUnavailable }) => (
                          <>
                            {formattedDate}
                            {!isUnavailable && <Calendar.CellIndicator />}
                          </>
                        )}
                      </Calendar.Cell>
                    )}
                  </Calendar.GridBody>
                </Calendar.Grid>
              </Calendar>
            </div>
          )}

          {/* Time Selection */}
          <Card
            variant="default"
            className="border-border bg-surface w-full border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Clock3 className="text-brand-600 size-5" />

                <h2 className="text-text-primary font-semibold">
                  Select a time
                </h2>
              </div>

              {selectedDate ? (
                <div className="mt-5 space-y-6">
                  {availableTimeSlots.length > 0 ? (
                    <div>
                      <h3 className="text-text-primary mb-3 text-sm font-medium">
                        Available Times
                      </h3>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <TimeSlot
                            key={slot.id}
                            time={slot.time}
                            selected={selectedTime === slot.time}
                            available={slot.available}
                            onSelect={() => {
                              if (!slot.available) {
                                return;
                              }

                              setSelectedTime(slot.time);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-warning/30 bg-warning/5 rounded-xl border p-4">
                      <p className="text-text-primary text-sm font-medium">
                        No available times
                      </p>

                      <p className="text-text-secondary mt-1 text-sm leading-6">
                        There are no available appointment times for this date.
                        Please choose another date.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary mt-5 text-sm">
                  Select a date to view available times.
                </p>
              )}
            </Card.Content>
          </Card>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center lg:m-10 lg:gap-10">
            <Link href={backUrl}>
              <MyButton
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Back
              </MyButton>
            </Link>

            <MyButton
              variant="primary"
              onPress={handleContinue}
              size="lg"
              className="w-full sm:w-auto"
              isDisabled={!canContinue}
            >
              Continue
            </MyButton>
          </div>
        </div>

        <div>
          <BookingSummary
            className="lg:sticky lg:top-24"
            provider={provider}
            service={selectedService}
            selectedDate={formatDateToString(selectedDate)}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </div>
  );
}
