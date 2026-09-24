"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button, Card } from "@heroui/react";
import MyButton from "../ui/MyButton";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Pencil,
  Phone,
  User,
} from "lucide-react";

import { services } from "@/lib/data/seed/services";
import type { Provider } from "@/lib/validation/provider.schema";

import { createBooking } from "@/lib/api/bookings";

import { useBookingStore } from "@/lib/store/booking-store";
import axios from "axios";
import { formatBookingDate, formatBookingTime } from "@/lib/utils/formatters";
type BookingReviewProps = {
  provider: Provider;
};

type BookingState = "idle" | "submitting" | "slot-unavailable" | "error";

export function BookingReview({ provider }: BookingReviewProps) {
  const { serviceId, date, time, customer, hasHydrated } = useBookingStore();
  const clearBooking = useBookingStore((state) => state.clearBooking);

  const customerName = customer?.customerName;
  const customerEmail = customer?.customerEmail;
  const customerPhone = customer?.customerPhone;
  const notes = customer?.notes;
  const [bookingState, setBookingState] = useState<BookingState>("idle");

  const router = useRouter();

  if (!hasHydrated) {
    return (
      <main className="bg-background min-h-screen">
        <h3>Loading ...</h3>
      </main>
    );
  }

  if (!serviceId || !date || !time || !customer) {
    console.log("!serviceId || !date || !time || !customer");

    router.replace(`/book/${provider.id}`);
    return null;
  }

  // if (!selectedService) {
  //   return (
  //     <main className="bg-background min-h-screen">
  //       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  //         <BookingProgress />

  //         <div className="mx-auto mt-8 max-w-2xl">
  //           <Card
  //             variant="default"
  //             className="border-border bg-surface border shadow-sm"
  //           >
  //             <Card.Content className="p-6 text-center sm:p-8">
  //               <h1 className="text-text-primary text-xl font-semibold">
  //                 Service not found
  //               </h1>

  //               <p className="text-text-secondary mt-2 text-sm leading-6">
  //                 The selected service is no longer available for this
  //                 professional.
  //               </p>

  //               <Link
  //                 href={`/providers/${provider.slug}`}
  //                 className="mt-6 inline-block"
  //               >
  //                 <Button variant="primary">Back to Provider</Button>
  //               </Link>
  //             </Card.Content>
  //           </Card>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }
  // if (!date || !time) {
  //   return (
  //     <main className="bg-background min-h-screen">
  //       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  //         <BookingProgress />

  //         <div className="mx-auto mt-8 max-w-2xl">
  //           <Card
  //             variant="default"
  //             className="border-border bg-surface border shadow-sm"
  //           >
  //             <Card.Content className="p-6 text-center sm:p-8">
  //               <h1 className="text-text-primary text-xl font-semibold">
  //                 Didn{"'"}t select Date and Time
  //               </h1>
  //               <Link href={`/providers/booking`} className="mt-6 inline-block">
  //                 <Button variant="primary">Back to Date and Time</Button>
  //               </Link>
  //             </Card.Content>
  //           </Card>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }
  // if (!customer) {
  //   return (
  //     <main className="bg-background min-h-screen">
  //       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  //         <BookingProgress />

  //         <div className="mx-auto mt-8 max-w-2xl">
  //           <Card
  //             variant="default"
  //             className="border-border bg-surface border shadow-sm"
  //           >
  //             <Card.Content className="p-6 text-center sm:p-8">
  //               <h1 className="text-text-primary text-xl font-semibold">
  //                 Didn{"'"}t Inter your Details
  //               </h1>
  //               <Link href={`/providers/booking`} className="mt-6 inline-block">
  //                 <Button variant="primary">Back to Your Details</Button>
  //               </Link>
  //             </Card.Content>
  //           </Card>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }

  const selectedService = services.find(
    (service) => service.id === serviceId && service.providerId === provider.id,
  );

  if (!selectedService) {
    console.log("!selectedService");
    router.replace(`/book/${provider.id}`);
    return null;
  }

  const handleConfirmBooking = async () => {
    if (bookingState === "submitting") {
      return;
    }
    setBookingState("submitting");

    try {
      const booking = await createBooking({
        providerId: provider.id,
        serviceId: serviceId,
        date: date,
        time: time,
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
        customerPhone: customerPhone || undefined,
        notes: notes || undefined,
      });

      sessionStorage.setItem(
        `localserve:booking:${booking.id}`,
        JSON.stringify(booking),
      );

      clearBooking();

      const confirmationParams = new URLSearchParams();

      confirmationParams.set("reference", booking.reference);

      router.push(
        `/booking/confirmation/${booking.id}` +
          `?${confirmationParams.toString()}`,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setBookingState("slot-unavailable");
        return;
      }

      setBookingState("error");
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BookingProgress />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-8">
              <p className="text-brand-600 text-sm font-medium">Step 4 of 4</p>

              <h1 className="text-text-primary mt-2 text-3xl font-semibold">
                Review & Confirm
              </h1>

              <p className="text-text-secondary mt-2 text-sm leading-6">
                Review your appointment details before confirming your booking.
              </p>
            </div>

            <div className="space-y-5">
              <Card
                variant="default"
                className="border-border bg-surface border shadow-sm"
              >
                <Card.Content className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        Professional
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <div className="bg-brand-50 flex size-11 shrink-0 items-center justify-center rounded-full">
                          <User className="text-brand-600 size-5" />
                        </div>

                        <div>
                          <h2 className="text-text-primary font-semibold">
                            {provider.name}
                          </h2>

                          <p className="text-text-secondary mt-0.5 text-sm">
                            {provider.headline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card
                variant="default"
                className="border-border bg-surface border shadow-sm"
              >
                <Card.Content className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        Appointment
                      </p>

                      <h2 className="text-text-primary mt-2 text-lg font-semibold">
                        {selectedService.title}
                      </h2>
                    </div>

                    <Button
                      variant="ghost"
                      onPress={() => {
                        router.push(
                          `/book/${provider.id}?service=${serviceId}`,
                        );
                      }}
                      size="sm"
                      className="shrink-0"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <InfoItem
                      icon={<CalendarDays className="size-4" />}
                      label="Date"
                      value={formatBookingDate(date)}
                    />

                    <InfoItem
                      icon={<Clock3 className="size-4" />}
                      label="Time"
                      value={formatBookingTime(time)}
                    />

                    <InfoItem
                      icon={<Clock3 className="size-4" />}
                      label="Duration"
                      value={`${selectedService.durationMinutes} min`}
                    />
                  </div>
                </Card.Content>
              </Card>

              <Card
                variant="default"
                className="border-border bg-surface border shadow-sm"
              >
                <Card.Content className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        Your Information
                      </p>

                      <h2 className="text-text-primary mt-2 text-lg font-semibold">
                        Contact Details
                      </h2>
                    </div>

                    <Button
                      variant="ghost"
                      onPress={() => {
                        router.push(`/book/${provider.id}/details`);
                      }}
                      size="sm"
                      className="shrink-0"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                  </div>

                  <div className="mt-5 space-y-4">
                    <InfoItem
                      icon={<User className="size-4" />}
                      label="Full Name"
                      value={customerName}
                    />

                    <InfoItem
                      icon={<Mail className="size-4" />}
                      label="Email"
                      value={customerEmail}
                    />

                    {customerPhone && (
                      <InfoItem
                        icon={<Phone className="size-4" />}
                        label="Phone"
                        value={customerPhone}
                      />
                    )}
                  </div>
                </Card.Content>
              </Card>

              {notes && (
                <Card
                  variant="default"
                  className="border-border bg-surface border shadow-sm"
                >
                  <Card.Content className="p-5 sm:p-6">
                    <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                      Additional Notes
                    </p>

                    <p className="text-text-primary mt-3 text-sm leading-6 whitespace-pre-wrap">
                      {notes}
                    </p>
                  </Card.Content>
                </Card>
              )}
            </div>

            {bookingState === "error" && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <h2 className="text-danger-600 font-medium">
                  We couldn{"'"}t confirm your booking
                </h2>

                <p className="text-danger-600 mt-1 text-sm leading-6">
                  Please try again. Your appointment details are still
                  available.
                </p>

                <Button
                  variant="danger"
                  size="sm"
                  className="mt-4"
                  onPress={() => setBookingState("idle")}
                >
                  Try Again
                </Button>
              </div>
            )}

            {bookingState === "slot-unavailable" && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"
              >
                <h2 className="font-medium text-amber-800">
                  This time slot is no longer available
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-700">
                  Please choose another available date and time.
                </p>

                <Link
                  href={`/book/${provider.id}`}
                  className="mt-4 inline-block"
                >
                  <MyButton variant="secondary" size="sm">
                    Choose Another Time
                  </MyButton>
                </Link>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Link href={`/book/${provider.id}/details`}>
                <MyButton
                  variant="secondary"
                  className="w-full sm:w-auto"
                  isDisabled={bookingState === "submitting"}
                >
                  Back
                </MyButton>
              </Link>

              <MyButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onPress={handleConfirmBooking}
                isDisabled={bookingState === "submitting"}
              >
                {bookingState === "submitting"
                  ? "Confirming..."
                  : "Confirm Booking"}
              </MyButton>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-5 sm:p-6">
                <h2 className="text-text-primary text-lg font-semibold">
                  Booking Summary
                </h2>

                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                      Professional
                    </p>

                    <p className="text-text-primary mt-1 font-medium">
                      {provider.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                      Service
                    </p>

                    <p className="text-text-primary mt-1 font-medium">
                      {selectedService.title}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-brand-50 flex size-9 shrink-0 items-center justify-center rounded-full">
                      <CalendarDays className="text-brand-600 size-4" />
                    </div>

                    <div>
                      <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        Date
                      </p>

                      <p className="text-text-primary mt-1 text-sm font-medium">
                        {formatBookingDate(date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-brand-50 flex size-9 shrink-0 items-center justify-center rounded-full">
                      <Clock3 className="text-brand-600 size-4" />
                    </div>

                    <div>
                      <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
                        Time
                      </p>

                      <p className="text-text-primary mt-1 text-sm font-medium">
                        {formatBookingTime(time)}
                      </p>
                    </div>
                  </div>

                  <div className="border-border border-t pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-text-secondary text-sm">
                        Estimated Price
                      </span>

                      <span className="text-text-primary text-lg font-semibold">
                        €{(selectedService.priceCents / 100).toFixed(0)}
                      </span>
                    </div>

                    <p className="text-text-secondary mt-2 text-xs leading-5">
                      This is an estimated service price. No payment is required
                      at this stage.
                    </p>
                  </div>

                  <div className="bg-brand-50 flex items-start gap-2 rounded-lg p-3">
                    <CheckCircle2 className="text-brand-600 mt-0.5 size-4 shrink-0" />

                    <p className="text-brand-700 text-xs leading-5">
                      Your appointment details will be confirmed when the
                      booking is submitted.
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function BookingProgress() {
  const steps = ["Service", "Date & Time", "Your Details", "Review"];

  return (
    <nav aria-label="Booking progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === 4;
          const isCompleted = stepNumber < 4;

          return (
            <li key={step} className="flex flex-1 items-center">
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                    isActive
                      ? "bg-brand-600 text-white"
                      : isCompleted
                        ? "bg-brand-100 text-brand-700"
                        : "bg-surface-muted text-text-secondary",
                  ].join(" ")}
                >
                  {stepNumber}
                </div>

                <span
                  className={[
                    "hidden text-sm sm:inline",
                    isActive
                      ? "text-text-primary font-medium"
                      : "text-text-secondary",
                  ].join(" ")}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="bg-border mx-3 h-px flex-1" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string | undefined;
  value: string | undefined;
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
