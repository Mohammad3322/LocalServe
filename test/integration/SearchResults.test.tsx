import { render, screen } from "@testing-library/react";

import { SearchResults } from "@/components/search/SearchResults";
import { searchProviders } from "@/lib/services/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";

let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const renderSearch = async (search: string) => {
  currentSearch = search;

  const params = searchParamsSchema.parse(
    Object.fromEntries(new URLSearchParams(search)),
  );

  const result = await searchProviders(params);

  return render(<SearchResults initialData={result} initialParams={params} />);
};

describe("SearchResults", () => {
  it("uses the service filter from the URL", async () => {
    const expected = searchProviders({
      page: 1,
      service: "Solar",
      sort: "rating",
    });

    await renderSearch("service=Solar");

    expect(
      screen.getByText(`${expected.total} professionals found`),
    ).toBeInTheDocument();
    expect(screen.getByText(expected.items[0].name)).toBeInTheDocument();
  });

  it("shows an empty state when no providers match", async () => {
    await renderSearch("location=atlanis");

    expect(screen.getByText("0 professionals found")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /view profile/i }),
    ).not.toBeInTheDocument();
  });
});
