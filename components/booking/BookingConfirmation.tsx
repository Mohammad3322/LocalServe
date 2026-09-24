"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  User,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@heroui/react";

import type { BookingResponse } from "@/lib/validation/booking.schema";
import MyButton from "../ui/MyButton";

type BookingConfirmationProps = {
  bookingId: string;
  reference?: string;
};

type ConfirmationState = "loading" | "success" | "connection-lost";

export function BookingConfirmation({
  bookingId,
  reference,
}: BookingConfirmationProps) {
  const [booking] = useState<BookingResponse | null | undefined>(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

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

  const state: ConfirmationState =
    booking === undefined ? "loading" : booking ? "success" : "connection-lost";

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-text-secondary text-sm">
            Loading your booking confirmation...
          </p>
        </div>
      </div>
    );
  }

  if (state === "connection-lost") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <Card
          variant="default"
          className="border-border bg-surface border shadow-sm"
        >
          <Card.Content className="p-6 text-center sm:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-50">
              <AlertTriangle className="size-7 text-amber-600" />
            </div>

            <h1 className="text-text-primary mt-6 text-2xl font-semibold">
              We couldn{"'"}t verify your booking
            </h1>

            <p className="text-text-secondary mx-auto mt-3 max-w-lg text-sm leading-6">
              Your booking may have been created successfully, but we couldn
              {"'"}t retrieve the confirmation details.
            </p>

            {reference && (
              <div className="bg-surface-muted mt-6 rounded-lg p-4">
                <p className="text-text-secondary text-xs">Booking reference</p>

                <p className="text-text-primary mt-1 font-semibold">
                  {reference}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/">
                <MyButton variant="secondary" className="w-full sm:w-auto">
                  Back to Home
                </MyButton>
              </Link>

              <Link href="/services">
                <MyButton variant="primary" className="w-full sm:w-auto">
                  Explore Services
                </MyButton>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="bg-brand-50 mx-auto flex size-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-brand-600 size-8" />
        </div>

        <p className="text-brand-600 mt-5 text-sm font-medium">
          Booking confirmed
        </p>

        <h1 className="text-text-primary mt-2 text-3xl font-semibold">
          Your appointment is confirmed
        </h1>

        <p className="text-text-secondary mx-auto mt-3 max-w-xl text-sm leading-6">
          Your appointment has been successfully booked. We have saved your
          booking details below.
        </p>
      </div>

      {booking && (
        <div className="mt-10 space-y-5">
          <Card
            variant="default"
            className="border-border bg-surface border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                    Booking Reference
                  </p>

                  <p className="text-text-primary mt-1 text-lg font-semibold">
                    {booking.reference}
                  </p>
                </div>

                <span className="bg-brand-50 text-brand-700 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium">
                  Confirmed
                </span>
              </div>
            </Card.Content>
          </Card>

          <Card
            variant="default"
            className="border-border bg-surface border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <h2 className="text-text-primary text-lg font-semibold">
                Appointment Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={<CalendarDays className="size-4" />}
                  label="Date"
                  value={formatBookingDate(booking.date)}
                />

                <InfoItem
                  icon={<Clock3 className="size-4" />}
                  label="Time"
                  value={formatBookingTime(booking.time)}
                />
              </div>
            </Card.Content>
          </Card>

          <Card
            variant="default"
            className="border-border bg-surface border shadow-sm"
          >
            <Card.Content className="p-5 sm:p-6">
              <h2 className="text-text-primary text-lg font-semibold">
                Your Information
              </h2>

              <div className="mt-5 space-y-5">
                <InfoItem
                  icon={<User className="size-4" />}
                  label="Full Name"
                  value={booking.customerName}
                />

                <InfoItem
                  icon={<Mail className="size-4" />}
                  label="Email"
                  value={booking.customerEmail}
                />
              </div>
            </Card.Content>
          </Card>

          <div className="bg-brand-50 rounded-xl p-4">
            <p className="text-brand-700 text-sm leading-6">
              A confirmation email will be sent to{" "}
              <strong>{booking.customerEmail}</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link href={`/providers/${booking.providerId}`}>
              <MyButton variant="secondary" className="w-full sm:w-auto">
                View Provider
              </MyButton>
            </Link>

            <Link href="/">
              <MyButton variant="primary" className="w-full sm:w-auto">
                Back to Home
              </MyButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-brand-50 text-brand-600 flex size-9 shrink-0 items-center justify-center rounded-full">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
          {label}
        </p>

        <p className="text-text-primary mt-1 text-sm font-medium wrap-break-word">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatBookingDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function formatBookingTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
