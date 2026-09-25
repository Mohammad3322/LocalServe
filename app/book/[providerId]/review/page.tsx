import { notFound } from "next/navigation";

import { BookingReview } from "@/components/booking/BookingReview";
import { getProviderById } from "@/lib/services/providers";

type ReviewPageProps = {
  params: Promise<{
    providerId: string;
  }>;
};

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { providerId } = await params;

  const provider = getProviderById(providerId);

  if (!provider) {
    notFound();
  }

  return <BookingReview provider={provider} />;
}
