import { render } from "@testing-library/react";

import RatingStars from "@/components/ui/RatingStars";

const starClasses = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("svg")).map((star) =>
    star.getAttribute("class"),
  );

const isFilled = (className: string | null) =>
  className?.includes("fill-current") ?? false;

describe("RatingStars", () => {
  it("always renders exactly five stars", () => {
    const { container } = render(<RatingStars rating={3} />);

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("fills the stars up to the rating and leaves the rest empty", () => {
    const { container } = render(<RatingStars rating={3} />);

    expect(starClasses(container).map(isFilled)).toEqual([
      true,
      true,
      true,
      false,
      false,
    ]);
  });

  it("fills every star for a rating of 5", () => {
    const { container } = render(<RatingStars rating={5} />);

    expect(starClasses(container).every(isFilled)).toBe(true);
  });

  it("fills no stars for a rating of 0", () => {
    const { container } = render(<RatingStars rating={0} />);

    expect(starClasses(container).some(isFilled)).toBe(false);
  });

  it("renders a filled star for a fractional rating rounded up by the caller", () => {
    const { container } = render(<RatingStars rating={Math.round(4.5)} />);

    expect(starClasses(container).filter(isFilled)).toHaveLength(5);
  });
});
