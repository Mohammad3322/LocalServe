import { notFound } from "next/navigation";

import { BookingDetails } from "@/components/booking/BookingDetails";
import { getProviderById } from "@/lib/services/providers";

type BookingDetailsRouteProps = {
  params: Promise<{
    providerId: string;
  }>;
};

export default async function BookingDetailsRoute({
  params,
}: BookingDetailsRouteProps) {
  const { providerId } = await params;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  return <BookingDetails provider={provider} />;
}
