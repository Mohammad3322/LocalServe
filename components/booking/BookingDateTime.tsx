"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { CalendarDays, Check, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";

import { availability } from "@/lib/data/seed/availability";
import { services } from "@/lib/data/seed/services";
import type { Provider } from "@/lib/validation/provider.schema";
import { BookingSummary } from "./BookingSummary";
import MyButton from "../ui/MyButton";

type BookingDateTimeProps = {
  provider: Provider;
  selectedServiceId?: string;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function BookingDateTime({
  provider,
  selectedServiceId,
}: BookingDateTimeProps) {
  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  );

  const providerSlots = useMemo(
    () =>
      availability.filter(
        (slot) => slot.providerId === provider.id && slot.available,
      ),
    [provider.id],
  );

  const dates = useMemo(() => {
    return Array.from(new Set(providerSlots.map((slot) => slot.date)));
  }, [providerSlots]);

  const [selectedDate, setSelectedDate] = useState<string>(dates[0] ?? "");

  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = providerSlots.filter((slot) => slot.date === selectedDate);

  const morningSlots = timeSlots.filter(
    (slot) => Number(slot.time.slice(0, 2)) < 12,
  );

  const afternoonSlots = timeSlots.filter(
    (slot) => Number(slot.time.slice(0, 2)) >= 12,
  );

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
            className="border-border bg-surface border shadow-sm"
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
          <Card
            variant="default"
            className="border-border bg-surface border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-brand-600 size-5" />

                <h2 className="text-text-primary font-semibold">
                  Select a date
                </h2>
              </div>

              {dates.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {dates.map((date) => {
                    const isSelected = date === selectedDate;

                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime("");
                        }}
                        className={[
                          "rounded-xl border p-4 text-left transition",
                          isSelected
                            ? "border-brand-500 bg-brand-50 ring-brand-500 ring-1"
                            : "border-border bg-background hover:border-brand-300",
                        ].join(" ")}
                      >
                        <p className="text-text-primary text-sm font-medium">
                          {formatDate(date)}
                        </p>

                        {isSelected && (
                          <span className="text-brand-700 mt-2 inline-flex items-center gap-1 text-xs font-medium">
                            <Check className="size-3.5" />
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-secondary mt-5 text-sm">
                  No available dates at the moment.
                </p>
              )}
            </Card.Content>
          </Card>

          {/* Time Selection */}
          <Card
            variant="default"
            className="border-border bg-surface border shadow-sm"
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
                  {morningSlots.length > 0 && (
                    <div>
                      <h3 className="text-text-primary mb-3 text-sm font-medium">
                        Morning
                      </h3>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {morningSlots.map((slot) => (
                          <TimeSlot
                            key={slot.id}
                            time={slot.time}
                            selected={selectedTime === slot.time}
                            onSelect={() => setSelectedTime(slot.time)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {afternoonSlots.length > 0 && (
                    <div>
                      <h3 className="text-text-primary mb-3 text-sm font-medium">
                        Afternoon
                      </h3>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {afternoonSlots.map((slot) => (
                          <TimeSlot
                            key={slot.id}
                            time={slot.time}
                            selected={selectedTime === slot.time}
                            onSelect={() => setSelectedTime(slot.time)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {timeSlots.length === 0 && (
                    <p className="text-text-secondary text-sm">
                      No available times for this date.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary mt-5 text-sm">
                  Select a date to view available times.
                </p>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Booking Summary */}
        <BookingSummary
          provider={provider}
          service={selectedService}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </div>
    </div>
  );
}

function TimeSlot({
  time,
  selected,
  onSelect,
}: {
  time: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "rounded-xl border px-4 py-3 text-sm font-medium transition",
        selected
          ? "border-brand-500 bg-brand-50 text-brand-700 ring-brand-500 ring-1"
          : "border-border bg-background text-text-primary hover:border-brand-300",
      ].join(" ")}
    >
      {time}
    </button>
  );
}
