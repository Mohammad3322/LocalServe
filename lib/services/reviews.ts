import { reviews } from "@/lib/data/seed/reviews";
import type { Review } from "@/lib/validation/review.schema";

export function getReviewsByProviderId(providerId: string): Review[] {
  return reviews.filter((review) => review.providerId === providerId);
}

export function getTotalRatingByProviderId(providerId: string): number {
  const customersRatings = getReviewsByProviderId(providerId);

  const averageRating =
    customersRatings.length > 0
      ? customersRatings.reduce((total, review) => total + review.rating, 0) /
        customersRatings.length
      : 0;
  return averageRating;
}
