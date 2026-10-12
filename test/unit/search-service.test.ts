import { searchProviders } from "@/lib/services/search";
import { providers, services } from "@/lib/data/seed/generate";
import { searchParamsSchema } from "@/lib/validation/search.schema";

function parseParams(input: Record<string, string>) {
  return searchParamsSchema.parse(input);
}

describe("searchProviders", () => {
  it("returns the first page of providers when no filters are set", () => {
    const result = searchProviders(parseParams({ page: "1" }));

    expect(result.total).toBe(providers.length);
    expect(result.items.length).toBeLessThanOrEqual(result.pageSize);
    expect(result.totalPages).toBe(
      Math.ceil(providers.length / result.pageSize),
    );
  });

  it("returns the second page correctly", () => {
    const page1 = searchProviders(parseParams({ page: "1" }));
    const page2 = searchProviders(parseParams({ page: "2" }));

    expect(page2.page).toBe(2);
    expect(page2.items.length).toBeGreaterThan(0);

    const ids1 = new Set(page1.items.map((i) => i.provider.id));
    const ids2 = page2.items.map((i) => i.provider.id);
    expect(ids2.some((id) => ids1.has(id))).toBe(false);
  });

  it("filters providers by location", () => {
    const location = providers[0].serviceArea;
    const result = searchProviders(parseParams({ page: "1", location }));

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every((item) =>
        item.provider.serviceArea
          .toLowerCase()
          .includes(location.toLowerCase()),
      ),
    ).toBe(true);
  });

  it("filters providers by service title and picks matchedService", () => {
    const result = searchProviders(
      parseParams({ page: "1", service: "solar" }),
    );

    expect(result.total).toBeGreaterThan(0);
    expect(
      result.items.every((item) =>
        item.matchedService.title.toLowerCase().includes("solar"),
      ),
    ).toBe(true);
  });

  it("filters providers by category", () => {
    const category = services[0].category;
    const result = searchProviders(parseParams({ page: "1", category }));

    expect(
      result.items.every((item) => item.matchedService.category === category),
    ).toBe(true);
  });

  it("filters providers by rating (>=)", () => {
    const result = searchProviders(parseParams({ page: "1", rating: "4" }));

    expect(result.items.every((item) => item.provider.rating >= 4)).toBe(true);
  });

  it("filters providers by price range", () => {
    const result = searchProviders(
      parseParams({ page: "1", price: "100-500" }),
    );

    expect(
      result.items.every((item) => {
        const price = item.matchedService.priceCents / 100;
        return price >= 100 && price <= 500;
      }),
    ).toBe(true);
  });

  it("combines location and availability filters", () => {
    const location = providers[0].serviceArea;
    const result = searchProviders(
      parseParams({ page: "1", location, availability: "true" }),
    );

    expect(
      result.items.every(
        (item) =>
          item.provider.available &&
          item.provider.serviceArea
            .toLowerCase()
            .includes(location.toLowerCase()),
      ),
    ).toBe(true);
  });

  it("sorts by rating descending by default", () => {
    const result = searchProviders(parseParams({ page: "1" }));

    for (let i = 1; i < result.items.length; i++) {
      expect(result.items[i - 1].provider.rating).toBeGreaterThanOrEqual(
        result.items[i].provider.rating,
      );
    }
  });

  it("sorts by price-low ascending", () => {
    const result = searchProviders(
      parseParams({ page: "1", sort: "price-low" }),
    );

    for (let i = 1; i < result.items.length; i++) {
      expect(result.items[i - 1].provider.startingPrice).toBeLessThanOrEqual(
        result.items[i].provider.startingPrice,
      );
    }
  });

  it("sorts by price-high descending", () => {
    const result = searchProviders(
      parseParams({ page: "1", sort: "price-high" }),
    );

    for (let i = 1; i < result.items.length; i++) {
      expect(result.items[i - 1].provider.startingPrice).toBeGreaterThanOrEqual(
        result.items[i].provider.startingPrice,
      );
    }
  });

  it("returns empty items when no provider matches", () => {
    const result = searchProviders(
      parseParams({ page: "1", service: "___nonexistent___" }),
    );

    expect(result.total).toBe(0);
    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(0);
  });

  it("ignores invalid params (Zod catch)", () => {
    const result = searchProviders(
      searchParamsSchema.parse({ page: "1", rating: "abc" }),
    );

    expect(result.total).toBe(providers.length);
  });
});
