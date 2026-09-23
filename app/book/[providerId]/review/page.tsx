import { notFound, redirect } from "next/navigation";

import { BookingReview } from "@/components/booking/BookingReview";
import { getProviderById } from "@/lib/services/providers";

type ReviewPageProps = {
  params: Promise<{
    providerId: string;
  }>;
  searchParams: Promise<{
    service?: string;
    date?: string;
    time?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    notes?: string;
  }>;
};

export default async function ReviewPage({
  params,
  searchParams,
}: ReviewPageProps) {
  const { providerId } = await params;

  const {
    service,
    date,
    time,
    customerName,
    customerEmail,
    customerPhone,
    notes,
  } = await searchParams;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  if (!service || !date || !time || !customerName || !customerEmail) {
    redirect(`/book/${providerId}`);
  }

  return (
    <BookingReview
      provider={provider}
      selectedServiceId={service}
      selectedDate={date}
      selectedTime={time}
      customerName={customerName}
      customerEmail={customerEmail}
      customerPhone={customerPhone}
      notes={notes}
    />
  );
}
