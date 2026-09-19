import { reviews } from "../data/seed/reviews";
import { Review } from "../validation/review.schema";

export function getReviews(slug: string): Review | undefined {
  return reviews.find((review) => review.providerSlug === slug);
}
