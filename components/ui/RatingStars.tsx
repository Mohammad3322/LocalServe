import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;

        return (
          <Star
            key={starNumber}
            className={`size-4 ${
              starNumber <= rating
                ? "fill-current text-amber-500"
                : "text-border"
            }`}
          />
        );
      })}
    </div>
  );
}
