import { reviews } from "@/lib/data/seed/reviews";
import type { Review } from "@/lib/validation/review.schema";
import { providers } from "../data/seed/generate";

export function getReviewsByProviderId(providerId: string): Review[] {
  return reviews.filter((review) => review.providerId === providerId);
}

export function getTotalRatingByProviderId(providerId: string): number {
  return providers.find((provider) => provider.id === providerId)?.rating || 0;
}
