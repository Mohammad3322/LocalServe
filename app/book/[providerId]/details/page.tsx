import { notFound, redirect } from "next/navigation";

import { BookingDetails } from "@/components/booking/BookingDetails";
import { getProviderById } from "@/lib/services/providers";

type BookingDetailsRouteProps = {
  params: Promise<{
    providerId: string;
  }>;
  searchParams: Promise<{
    service?: string;
    date?: string;
    time?: string;
  }>;
};

export default async function BookingDetailsRoute({
  params,
  searchParams,
}: BookingDetailsRouteProps) {
  const { providerId } = await params;

  const { service, date, time } = await searchParams;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  if (!service || !date || !time) {
    redirect(`/book/${providerId}`);
  }

  return (
    <BookingDetails
      provider={provider}
      selectedServiceId={service}
      selectedDate={date}
      selectedTime={time}
    />
  );
}
