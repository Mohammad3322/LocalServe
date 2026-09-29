import { render, screen } from "@testing-library/react";

// import {  within } from "@testing-library/react";

import { ProviderReviews } from "@/components/providers/ProviderReviews";
import { reviews as seededReviews } from "@/lib/data/seed/reviews";
import { getTotalRatingByProviderId } from "@/lib/services/reviews";

const providerWithReviews = (() => {
  const providerId = seededReviews[1]?.providerId;

  if (!providerId) {
    throw new Error("The seed must contain reviews.");
  }

  return providerId;
})();

describe("ProviderReviews", () => {
  // it("shows the provider name", () => {
  //   render(<ProviderReviews providerId="pro-5" />);

  //   const provider = getProviderById("pro-5");
  //   expect(provider).toBeDefined();

  //   expect(screen.getByText(provider!.name)).toBeInTheDocument();
  // });

  it("shows the average rating to one decimal place", () => {
    render(<ProviderReviews providerId="pro-5" />);

    expect(
      screen.getByText(getTotalRatingByProviderId("pro-5").toFixed(1)),
    ).toBeInTheDocument();
  });

  it("shows a fractional average rather than a rounded one", () => {
    render(<ProviderReviews providerId="pro-2" />);

    const text = getTotalRatingByProviderId("pro-2").toFixed(1);

    expect(screen.getByText(text)).toBeInTheDocument();

    if (getTotalRatingByProviderId("pro-2") % 1 !== 0) {
      expect(text).toContain(".");
    }
  });

  // it("shows how many reviews", () => {
  //   render(<ProviderReviews providerId={providerWithReviews} />);

  //   expect(screen.getByText(/reviews$/)).toBeInTheDocument();
  //   expect(
  //     screen.getByText(`${reviewsOf(providerWithReviews).length} reviews`),
  //   ).toBeInTheDocument();
  // });

  // it("renders the author, date and body of every review", () => {
  //   const { container } = render(
  //     <ProviderReviews providerId={providerWithReviews} />,
  //   );

  //   const expected = reviewsOf(providerWithReviews);
  //   const times = Array.from(container.querySelectorAll("time"));

  //   expect(times).toHaveLength(expected.length);

  //   expected.forEach((review, index) => {
  //     const card = times[index].parentElement?.parentElement as HTMLElement;

  //     expect(within(card).getByText(review.customerName)).toBeInTheDocument();
  //     expect(within(card).getByText(review.comment)).toBeInTheDocument();
  //   });
  // });

  // it("exposes the review date in a machine readable time element", () => {
  //   const { container } = render(
  //     <ProviderReviews providerId={providerWithReviews} />,
  //   );

  //   const dates = Array.from(container.querySelectorAll("time")).map((time) =>
  //     time.getAttribute("datetime"),
  //   );

  //   expect(dates).toEqual(
  //     reviewsOf(providerWithReviews).map((review) => review.createdAt),
  //   );
  // });

  it("shows the empty state for a provider with no reviews", () => {
    render(<ProviderReviews providerId="pro-unknown" />);

    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
    expect(screen.queryByText("0.0")).not.toBeInTheDocument();
  });

  it("keeps the section anchor used by the profile page links", () => {
    const { container } = render(
      <ProviderReviews providerId={providerWithReviews} />,
    );

    expect(container.querySelector("section#reviews")).toBeInTheDocument();
  });
});
