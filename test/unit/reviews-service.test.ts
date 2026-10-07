import {
  getReviewsByProviderId,
  getTotalRatingByProviderId,
} from "@/lib/services/reviews";
import { reviews } from "@/lib/data/seed/generate";

describe("getReviewsByProviderId", () => {
  it("returns only the reviews written for that provider", () => {
    const found = getReviewsByProviderId("pro-3");
    const expected = reviews.filter((review) => review.providerId === "pro-3");

    expect(found.length).toBeGreaterThan(0);
    expect(found).toHaveLength(expected.length);
    expect(found.every((review) => review.providerId === "pro-3")).toBe(true);
  });

  it("returns an empty array for an unknown provider", () => {
    expect(getReviewsByProviderId("pro-unknown")).toEqual([]);
  });

  it("returns an empty array for a provider that exists but has no reviews", () => {
    let result: unknown;

    jest.isolateModules(() => {
      jest.doMock("@/lib/data/seed/reviews", () => ({ reviews: [] }));

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const reviewsModule = require("@/lib/services/reviews");

      result = reviewsModule.getReviewsByProviderId("pro-3");
    });

    expect(result).toEqual([]);
  });
});

describe("getTotalRatingByProviderId", () => {
  it("stays within the 0-5 rating scale for every seeded provider", () => {
    for (const providerId of new Set(
      reviews.map((review) => review.providerId),
    )) {
      const mean = getTotalRatingByProviderId(providerId);

      expect(mean).toBeGreaterThanOrEqual(0);
      expect(mean).toBeLessThanOrEqual(5);
    }
  });

  it("returns 0 rather than NaN when there are no reviews", () => {
    expect(getTotalRatingByProviderId("pro-unknown")).toBe(0);
  });

  it("returns 0 rather than NaN for an existing provider with no reviews", () => {
    let result: unknown;

    jest.isolateModules(() => {
      jest.doMock("@/lib/data/seed/generate", () => ({ reviews: [] }));

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const reviewsModule = require("@/lib/services/reviews");

      result = reviewsModule.getTotalRatingByProviderId("pro-3");
    });

    expect(result).toBe(0);
  });
});
