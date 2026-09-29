import { Star } from "lucide-react";

import {
  getReviewsByProviderId,
  getTotalRatingByProviderId,
} from "@/lib/services/reviews";
import RatingStars from "../ui/RatingStars";
import ReviewCard from "../ui/ReviewCard";

type ProviderReviewsProps = {
  providerId: string;
};

export function ProviderReviews({ providerId }: ProviderReviewsProps) {
  const providerReviews = getReviewsByProviderId(providerId);

  const rating = getTotalRatingByProviderId(providerId);

  return (
    <section id="reviews" className="border-border border-b py-12">
      <div>
        <div>
          <h2 className="text-text-primary text-2xl font-semibold">Reviews</h2>

          <p className="text-text-secondary mt-2 text-sm">
            See what customers say about this professional.
          </p>
        </div>

        {rating && rating > 0 ? (
          <>
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-text-primary text-3xl font-semibold">
                  {rating}
                </p>

                <div className="mt-2">
                  <RatingStars rating={Math.round(rating)} />
                </div>
              </div>

              <div className="bg-border h-px w-full sm:h-12 sm:w-px" />

              <div>
                <p className="text-text-primary font-medium">
                  {providerReviews.length}
                  {providerReviews.length === 1 ? " review" : " reviews"}
                </p>

                <p className="text-text-secondary mt-1 text-sm">
                  Based on customer feedback.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 space-y-4 md:grid-cols-2">
              {providerReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        ) : (
          <div className="border-border bg-surface mt-6 rounded-xl border p-8 text-center">
            <div className="bg-brand-50 mx-auto flex size-12 items-center justify-center rounded-full">
              <Star className="text-brand-600 size-5" />
            </div>

            <h3 className="text-text-primary mt-4 font-semibold">
              No reviews yet
            </h3>

            <p className="text-text-secondary mx-auto mt-2 max-w-md text-sm leading-6">
              This professional has not received any customer reviews yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
