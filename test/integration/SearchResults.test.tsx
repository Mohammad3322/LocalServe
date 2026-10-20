import { render, screen, cleanup } from "@testing-library/react";

import { SearchResults } from "@/components/search/SearchResults";
import { searchProviders } from "@/lib/services/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";

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

afterEach(() => {
  currentSearch = "";
  cleanup();
});

describe("SearchResults", () => {
  it("uses the service filter from the URL", () => {
    const expected = searchProviders(
      searchParamsSchema.parse({
        page: "1",
        service: "Solar",
        sort: "rating",
      }),
    );

    renderSearch("service=Solar");

    expect(
      screen.getByText(new RegExp(`${expected.total} professionals?`)),
    ).toBeInTheDocument();

    expect(
      screen.getByText(expected.items[0].provider.name),
    ).toBeInTheDocument();
  });

  it("shows an empty state when no providers match", () => {
    renderSearch("location=Atlantis");

    expect(screen.getByText(/0 professionals?/)).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: /view profile/i }),
    ).not.toBeInTheDocument();
  });

  it("paginates results from the URL", () => {
    const expected = searchProviders(
      searchParamsSchema.parse({ page: "2", sort: "rating" }),
    );

    renderSearch("page=2");

    expect(
      screen.getByText(new RegExp(`${expected.total} professionals?`)),
    ).toBeInTheDocument();

    if (expected.items.length > 0) {
      expect(
        screen.getByText(expected.items[0].provider.name),
      ).toBeInTheDocument();
    }
  });
});
