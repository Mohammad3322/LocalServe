import { reviews } from "@/lib/data/seed/reviews";
import type { Review } from "@/lib/validation/review.schema";

export function getReviewsByProviderId(providerId: string): Review[] {
  return reviews.filter((review) => review.providerId === providerId);
}
