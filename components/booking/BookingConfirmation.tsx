"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { Button, Card } from "@heroui/react";

import type { BookingResponse } from "@/lib/validation/booking.schema";
import { services } from "@/lib/data/seed/services";
import { providers } from "@/lib/data/seed/providers";
import MyButton from "../ui/MyButton";

type BookingConfirmationProps = {
  bookingId: string;
  reference?: string;
};

export function BookingConfirmation({
  bookingId,
  reference,
}: BookingConfirmationProps) {
  const [booking] = useState<BookingResponse | null | undefined>(() => {
    try {
      const storedBooking = sessionStorage.getItem(
        `localserve:booking:${bookingId}`,
      );

      if (!storedBooking) {
        return null;
      }

      return JSON.parse(storedBooking) as BookingResponse;
    } catch {
      return null;
    }
  });

  if (booking === undefined) {
    return (
      <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl animate-pulse">
          <div className="bg-brand-100 mx-auto h-16 w-16 rounded-full" />

          <div className="bg-surface-muted mx-auto mt-6 h-8 w-64 rounded" />

          <div className="bg-surface-muted mx-auto mt-3 h-4 w-96 max-w-full rounded" />

          <div className="bg-surface-muted mt-10 h-64 rounded-2xl" />
        </div>
      </section>
    );
  }

  if (booking === null) {
    return <ConnectionLostState bookingId={bookingId} reference={reference} />;
  }

  const provider = providers.find((item) => item.id === booking.providerId);

  const service = services.find((item) => item.id === booking.serviceId);

  if (!provider || !service) {
    return <ConnectionLostState bookingId={bookingId} reference={reference} />;
  }

  const formattedDate = formatBookingDate(booking.date);

  const formattedTime = formatBookingTime(booking.time);

  const displayReference = booking.reference || reference || bookingId;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="bg-brand-50 mx-auto flex size-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-brand-600 size-9" />
        </div>

        <h1 className="text-text-primary mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Booking Confirmed
        </h1>

        <p className="text-text-secondary mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base">
          Your appointment has been successfully confirmed. We&apos;ve saved
          your booking details below.
        </p>

        <div className="border-border bg-surface mt-4 inline-flex items-center rounded-full border px-4 py-2 text-sm">
          <span className="text-text-secondary">Booking Reference</span>

          <span className="text-text-primary ml-2 font-semibold">
            {displayReference}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid gap-6">
        {/* Appointment */}
        <Card
          variant="default"
          className="border-border bg-surface border shadow-sm"
        >
          <Card.Content className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-brand-50 flex size-10 items-center justify-center rounded-full">
                <CalendarDays className="text-brand-600 size-5" />
              </div>

              <div>
                <h2 className="text-text-primary font-semibold">
                  Appointment Details
                </h2>

                <p className="text-text-secondary text-sm">
                  Your scheduled service
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<User className="size-4" />}
                label="Provider"
                value={provider.name}
              />

              <InfoItem
                icon={<MapPin className="size-4" />}
                label="Service"
                value={service.title}
              />

              <InfoItem
                icon={<CalendarDays className="size-4" />}
                label="Date"
                value={formattedDate}
              />

              <InfoItem
                icon={<Clock3 className="size-4" />}
                label="Time"
                value={`${formattedTime} · ${service.durationMinutes} minutes`}
              />
            </div>
          </Card.Content>
        </Card>

        {/* Customer Information */}
        <Card
          variant="default"
          className="border-border bg-surface border shadow-sm"
        >
          <Card.Content className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-brand-50 flex size-10 items-center justify-center rounded-full">
                <User className="text-brand-600 size-5" />
              </div>

              <div>
                <h2 className="text-text-primary font-semibold">
                  Customer Information
                </h2>

                <p className="text-text-secondary text-sm">
                  Information provided for this booking
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<User className="size-4" />}
                label="Name"
                value={booking.customerName}
              />

              <InfoItem
                icon={<Mail className="size-4" />}
                label="Email"
                value={booking.customerEmail}
              />

              {booking.customerPhone && (
                <InfoItem
                  icon={<span className="text-xs">☎</span>}
                  label="Phone"
                  value={booking.customerPhone}
                />
              )}
            </div>

            {booking.notes && (
              <div className="border-border mt-6 border-t pt-5">
                <p className="text-text-primary text-sm font-medium">
                  Additional Notes
                </p>

                <p className="text-text-secondary mt-2 text-sm leading-6">
                  {booking.notes}
                </p>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Confirmation Email */}
        <div className="border-brand-100 bg-brand-50 rounded-xl border p-5">
          <div className="flex items-start gap-3">
            <Mail className="text-brand-600 mt-0.5 size-5 shrink-0" />

            <div>
              <h2 className="text-text-primary font-medium">
                Confirmation email
              </h2>

              <p className="text-text-secondary mt-1 text-sm leading-6">
                A confirmation has been prepared for{" "}
                <span className="text-text-primary font-medium">
                  {booking.customerEmail}
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link href={`/providers/${provider.slug}`} className="flex-1">
            <MyButton variant="primary" size="lg" className="w-full">
              View Provider
            </MyButton>
          </Link>

          <Link href="/" className="flex-1">
            <Button variant="secondary" size="lg" className="w-full">
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-background text-text-secondary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-text-secondary text-xs">{label}</p>

        <p className="text-text-primary mt-1 text-sm font-medium wrap-break-word">
          {value}
        </p>
      </div>
    </div>
  );
}

function ConnectionLostState({
  bookingId,
  reference,
}: {
  bookingId: string;
  reference?: string;
}) {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-50">
          <AlertCircle className="size-8 text-amber-600" />
        </div>

        <h1 className="text-text-primary mt-6 text-2xl font-semibold sm:text-3xl">
          We&apos;re checking your booking
        </h1>

        <p className="text-text-secondary mx-auto mt-3 max-w-lg text-sm leading-6">
          We couldn&apos;t retrieve the booking details right now. Your booking
          may still have been created successfully.
        </p>

        {reference && (
          <div className="border-border bg-surface mt-5 rounded-xl border p-4">
            <p className="text-text-secondary text-xs">Booking Reference</p>

            <p className="text-text-primary mt-1 font-semibold">{reference}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <MyButton
            variant="secondary"
            size="lg"
            onPress={() => {
              window.location.reload();
            }}
          >
            Check Booking Status
          </MyButton>

          <Link href="/">
            <MyButton variant="secondary" size="lg">
              Back Home
            </MyButton>
          </Link>
        </div>

        <div className="text-text-secondary mt-6 flex items-center justify-center gap-2 text-xs">
          <span>Booking ID:</span>
          <span className="font-mono">{bookingId}</span>
        </div>
      </div>
    </section>
  );
}

function formatBookingDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function formatBookingTime(time: string) {
  const [hours, minutes] = time.split(":");

  const parsedHours = Number(hours);
  const parsedMinutes = Number(minutes);

  if (Number.isNaN(parsedHours) || Number.isNaN(parsedMinutes)) {
    return time;
  }

  const date = new Date();

  date.setHours(parsedHours, parsedMinutes, 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
