import { notFound } from "next/navigation";

import { BookingPage } from "@/components/booking/BookingPage";
import { getProviderById } from "@/lib/services/providers";

type BookingRouteProps = {
  params: Promise<{
    providerId: string;
  }>;
  searchParams: Promise<{
    service?: string;
  }>;
};

export default async function BookingRoute({
  params,
  searchParams,
}: BookingRouteProps) {
  const { providerId } = await params;
  const { service } = await searchParams;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  const validServiceId =
    service && provider.servicesIds?.some((sId) => sId === service)
      ? service
      : undefined;

  return <BookingPage provider={provider} selectedServiceId={validServiceId} />;
}
