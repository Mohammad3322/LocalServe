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

  const { service, date, time, customerName, customerEmail } =
    await searchParams;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  // if (!service) {
  //   console.log("!service");
  //   redirect(`/book/${providerId}`);
  // }
  // if (!date || !time) {
  //   console.log(" !date || !time ");
  //   redirect(`/book/${providerId}`);
  // }
  // if (!customerName || !customerEmail) {
  //   console.log("!customerName || !customerEmail");
  //   redirect(`/book/${providerId}`);
  // }

  return <BookingReview provider={provider} />;
}
