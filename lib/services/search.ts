import { providers, services } from "@/lib/data/seed/generate";
import type { Provider } from "@/lib/validation/provider.schema";
import type { SearchParams } from "@/lib/validation/search.schema";
import { Service } from "../validation/service.schema";

const PAGE_SIZE = 6;

export type SearchResultItem = {
  provider: Provider;
  matchedService: Service;
};

export type SearchResult = {
  items: SearchResultItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function getMatchingServiceIds(params: SearchParams): Set<string> {
  const matched = services.filter((service) => {
    // Filter by Service (title)
    if (params.service) {
      if (!service.title.toLowerCase().includes(params.service)) {
        return false;
      }
    }

    // Filter by Category
    if (params.category) {
      if (service.category !== params.category) {
        return false;
      }
    }

    // Filter by Price
    if (params.price) {
      const { min, max } = params.price;
      const priceInDollars = service.priceCents / 100;

      if (priceInDollars < min || priceInDollars > max) {
        return false;
      }
    }

    return true;
  });

  return new Set(matched.map((service) => service.id));
}

function findMatchedService(
  provider: Provider,
  matchingServiceIds: Set<string> | null,
): Service | undefined {
  if (!matchingServiceIds) {
    const firstServiceId = provider.servicesIds[0];
    return services.find((s) => s.id === firstServiceId);
  }

  return services.find(
    (s) => provider.servicesIds.includes(s.id) && matchingServiceIds.has(s.id),
  );
}

// Search Providers
export function searchProviders(params: SearchParams): SearchResult {
  let results = [...providers];
  let matchingServiceIds: Set<string> | null = null;

  //  Filter by Service + Category + Price
  if (params.service || params.category || params.price) {
    matchingServiceIds = getMatchingServiceIds(params);

    results = results.filter((provider) =>
      provider.servicesIds.some((id) => matchingServiceIds!.has(id)),
    );
  }

  // Filter by Location
  if (params.location) {
    results = results.filter((provider) =>
      provider.serviceArea.toLowerCase().includes(params.location!),
    );
  }

  // Filter by Rating
  if (params.rating) {
    results = results.filter((provider) => provider.rating >= params.rating!);
  }

  // Filter by Availability-
  if (params.availability === "true") {
    results = results.filter((provider) => provider.available);
  }

  // Sort
  switch (params.sort) {
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;

    case "price-low":
      results.sort((a, b) => a.startingPrice - b.startingPrice);
      break;

    case "price-high":
      results.sort((a, b) => b.startingPrice - a.startingPrice);
      break;

    case "availability":
      results.sort((a, b) => Number(b.available) - Number(a.available));
      break;
  }

  // Pagination
  const total = results.length;
  const page = params.page;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const items: SearchResultItem[] = results
    .slice(startIndex, endIndex)
    .map((provider) => {
      const matchedService = findMatchedService(provider, matchingServiceIds);
      if (!matchedService) return null;
      return { provider, matchedService };
    })
    .filter((item): item is SearchResultItem => item !== null);

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  };
}
