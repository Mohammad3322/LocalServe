import type { Metadata } from "next";

import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description: "Your LocalServe booking has been confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

type ConfirmationPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
  searchParams: Promise<{
    reference?: string;
  }>;
};

export default async function ConfirmationPage({
  params,
  searchParams,
}: ConfirmationPageProps) {
  const { bookingId } = await params;
  const { reference } = await searchParams;

  return (
    <main className="bg-background min-h-screen">
      <BookingConfirmation bookingId={bookingId} reference={reference} />
    </main>
  );
}
