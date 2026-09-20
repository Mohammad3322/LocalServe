import { notFound } from "next/navigation";

import { BookingDetails } from "@/components/booking/BookingDetails";
import { getProviderById } from "@/lib/services/providers";

type BookingRouteProps = {
  params: Promise<{
    providerId: string;
  }>;
  searchParams: Promise<{
    service?: string;
    date?: string;
    time?: string;
  }>;
};

export default async function BookingRoute({
  params,
  searchParams,
}: BookingRouteProps) {
  const { providerId } = await params;

  const { service, date, time } = await searchParams;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
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
