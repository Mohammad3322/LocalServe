import { render, screen } from "@testing-library/react";

import { SearchResults } from "@/components/search/SearchResults";
import { searchProviders } from "@/lib/services/search";

let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const renderSearch = (search: string) => {
  currentSearch = search;
  return render(<SearchResults />);
};

describe("SearchResults", () => {
  it("uses the service filter from the URL", () => {
    const expected = searchProviders({
      page: 1,
      service: "Solar",
      sort: "rating",
    });

    renderSearch("service=Solar");

    expect(
      screen.getByText(`${expected.total} professionals found`),
    ).toBeInTheDocument();
    expect(screen.getByText(expected.items[0].name)).toBeInTheDocument();
  });

  it("shows an empty state when no providers match", () => {
    renderSearch("location=Atlantis");

    expect(screen.getByText("0 professionals found")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /view profile/i }),
    ).not.toBeInTheDocument();
  });
});
