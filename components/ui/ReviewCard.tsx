import { Review } from "@/lib/validation/review.schema";
import { Card } from "@heroui/react";
import React from "react";
import RatingStars from "./RatingStars";

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card
      key={review.id}
      variant="default"
      className="border-border bg-surface border shadow-sm"
    >
      <Card.Content className="p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-text-primary font-medium">
              {review.customerName}
            </p>

            <div className="mt-2">
              <RatingStars rating={review.rating} />
            </div>
          </div>

          <time
            dateTime={review.createdAt}
            className="text-text-secondary text-xs"
          >
            {new Date(review.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <p className="text-text-secondary mt-4 text-sm leading-6">
          {review.comment}
        </p>
      </Card.Content>
    </Card>
  );
}

export default ReviewCard;
