"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Card, Label, TextArea } from "@heroui/react";
import { CalendarDays, Clock3 } from "lucide-react";

import { services } from "@/lib/data/seed/services";
import { customerDetailsSchema } from "@/lib/validation/booking.schema";
import type { Provider } from "@/lib/validation/provider.schema";
import MyInput from "../ui/MyInput";
import MyButton from "../ui/MyButton";

import { useBookingStore } from "@/lib/store/booking-store";
import { formatBookingDate, formatBookingTime } from "@/lib/utils/formatters";

type BookingDetailsProps = {
  provider: Provider;
};

export function BookingDetails({ provider }: BookingDetailsProps) {
  const router = useRouter();

  const { serviceId, date, time, customer, hasHydrated, setCustomer } =
    useBookingStore();

  const [customerName, setCustomerName] = useState(
    customer?.customerName ?? "",
  );

  const [customerEmail, setCustomerEmail] = useState(
    customer?.customerEmail ?? "",
  );

  const [customerPhone, setCustomerPhone] = useState(
    customer?.customerPhone ?? "",
  );

  const [notes, setNotes] = useState(customer?.notes ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedService = services.find(
    (service) => service.id === serviceId && service.providerId === provider.id,
  );

  if (!hasHydrated) {
    return (
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BookingProgress />

          <div className="mx-auto mt-8 max-w-2xl">
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-6 text-center sm:p-8">
                <p className="text-text-secondary text-sm">
                  Loading booking information...
                </p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (!selectedService || !date || !time) {
    return (
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BookingProgress />

          <div className="mx-auto mt-8 max-w-2xl">
            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-6 text-center sm:p-8">
                <h1 className="text-text-primary text-xl font-semibold">
                  Booking information is incomplete
                </h1>

                <p className="text-text-secondary mt-2 text-sm leading-6">
                  Please select a service, date, and time before entering your
                  details.
                </p>

                <Link
                  href={`/book/${provider.id}`}
                  className="mt-6 inline-block"
                >
                  <MyButton variant="secondary">Back to Date & Time</MyButton>
                </Link>
              </Card.Content>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  const handleSubmit = () => {
    const result = customerDetailsSchema.safeParse({
      customerName,
      customerEmail,
      customerPhone: customerPhone || undefined,
      notes: notes || undefined,
    });

    if (!result.success) {
      console.log("!result.success");

      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && !fieldErrors[field]) {
          console.log("typeof field === string && !fieldErrors[field]");

          fieldErrors[field] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setCustomer(result.data);
    setErrors({});

    router.push(`/book/${provider.id}/review`);
    console.log("customerDetails handleSubmit done");
  };

  const backUrl = `/book/${provider.id}`;

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BookingProgress />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-8">
              <p className="text-brand-600 text-sm font-medium">Step 3 of 4</p>

              <h1 className="text-text-primary mt-2 text-3xl font-semibold">
                Your Details
              </h1>

              <p className="text-text-secondary mt-2 text-sm leading-6">
                Enter your contact information so we can confirm your
                appointment.
              </p>
            </div>

            <Card
              variant="default"
              className="border-border bg-surface border shadow-sm"
            >
              <Card.Content className="p-5 sm:p-6">
                <div className="space-y-6">
                  <div className="">
                    <Label
                      htmlFor="customerName"
                      className="text-text-primary mb-2 block text-sm font-medium"
                    >
                      Full Name
                      <span className="ml-1 text-red-500">*</span>
                    </Label>

                    <MyInput
                      id="customerName"
                      placeholder="Enter your full name"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      aria-invalid={Boolean(errors.customerName)}
                    />

                    {errors.customerName && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="customerEmail"
                      className="text-text-primary mb-2 block text-sm font-medium"
                    >
                      Email
                      <span className="ml-1 text-red-500">*</span>
                    </Label>

                    <MyInput
                      id="customerEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      aria-invalid={Boolean(errors.customerEmail)}
                    />

                    {errors.customerEmail && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.customerEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="customerPhone"
                      className="text-text-primary mb-2 block text-sm font-medium"
                    >
                      Phone
                      <span className="text-text-secondary ml-1 text-xs font-normal">
                        (Optional)
                      </span>
                    </Label>

                    <MyInput
                      id="customerPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      aria-invalid={Boolean(errors.customerPhone)}
                    />

                    {errors.customerPhone && (
                      <p className="mt-1.5 text-sm text-red-600">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="notes"
                      className="text-text-primary mb-2 block text-sm font-medium"
                    >
                      Additional Notes
                      <span className="text-text-secondary ml-1 text-xs font-normal">
                        (Optional)
                      </span>
                    </Label>

                    <TextArea
                      id="notes"
                      placeholder="Anything the professional should know?"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows={5}
                      maxLength={500}
                    />

                    <div className="mt-1.5 flex justify-between gap-4">
                      {errors.notes ? (
                        <p className="text-sm text-red-600">{errors.notes}</p>
                      ) : (
                        <span />
                      )}

                      <span className="text-text-secondary shrink-0 text-xs">
                        {notes.length}/500
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Link href={backUrl}>
                <MyButton variant="secondary" className="w-full sm:w-auto">
                  Back
                </MyButton>
              </Link>

              <MyButton
                variant="primary"
                size="lg"
                onPress={handleSubmit}
                className="w-full sm:w-auto"
              >
                Continue to Review
              </MyButton>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card
              variant="default"
              className="border-border bg-brand-500 border shadow-sm"
            >
              <Card.Content className="p-5 sm:p-6">
                <h2 className="text-surface text-lg font-semibold">
                  Booking Summary
                </h2>

                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-surface text-xs font-medium tracking-wide uppercase">
                      Provider
                    </p>

                    <p className="text-surface mt-1 font-medium">
                      {provider.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-surface text-xs font-medium tracking-wide uppercase">
                      Service
                    </p>

                    <p className="text-surface mt-1 font-medium">
                      {selectedService.title}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-brand-50 flex size-9 shrink-0 items-center justify-center rounded-full">
                      <CalendarDays className="text-brand-600 size-4" />
                    </div>

                    <div>
                      <p className="text-surface text-xs font-medium tracking-wide uppercase">
                        Date
                      </p>

                      <p className="text-surface mt-1 text-sm font-medium">
                        {formatBookingDate(date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-brand-50 flex size-9 shrink-0 items-center justify-center rounded-full">
                      <Clock3 className="text-brand-600 size-4" />
                    </div>

                    <div>
                      <p className="text-surface text-xs font-medium tracking-wide uppercase">
                        Time
                      </p>

                      <p className="text-surface mt-1 text-sm font-medium">
                        {formatBookingTime(time)}
                      </p>
                    </div>
                  </div>

                  <div className="border-border border-t pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-surface-secondary text-sm">
                        Duration
                      </span>

                      <span className="text-surface text-sm font-medium">
                        {selectedService.durationMinutes} min
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-surface text-sm">
                        Estimated Price
                      </span>

                      <span className="text-surface font-semibold">
                        €{(selectedService.priceCents / 100).toFixed(0)}
                      </span>
                    </div>
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
          const isActive = stepNumber === 3;
          const isCompleted = stepNumber < 3;

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
