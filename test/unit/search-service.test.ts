import { searchProviders } from "@/lib/services/search";
import { locations } from "@/lib/data/seed/locations";
import { providers } from "@/lib/data/seed/providers";
import { services } from "@/lib/data/seed/services";

describe("searchProviders", () => {
  it("returns the first page of providers when no filters are set", () => {
    const result = searchProviders({ page: 1 });

    expect(result.total).toBe(providers.length);
    expect(result.items.length).toBeLessThanOrEqual(result.pageSize);
    expect(result.totalPages).toBe(
      Math.ceil(providers.length / result.pageSize),
    );
  });

  it("filters providers by location", () => {
    const location = locations[0].name;
    const result = searchProviders({ page: 1, location });

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every((provider) =>
        provider.serviceArea.toLowerCase().includes(location.toLowerCase()),
      ),
    ).toBe(true);
  });

  it("filters providers by service title", () => {
    const result = searchProviders({ page: 1, service: "Solar" });

    expect(result.total).toBeGreaterThan(0);
    expect(
      result.items.every((provider) =>
        provider.servicesIds.some((serviceId) =>
          services.some(
            (service) =>
              service.id === serviceId &&
              service.title.toLowerCase().includes("solar"),
          ),
        ),
      ),
    ).toBe(true);
  });

  it("combines location and availability filters", () => {
    const result = searchProviders({
      page: 1,
      location: locations[0].name,
      availability: "true",
    });

    expect(
      result.items.every(
        (provider) =>
          provider.available &&
          provider.serviceArea
            .toLowerCase()
            .includes(locations[0].name.toLowerCase()),
      ),
    ).toBe(true);
  });
});
