import { providers, services } from "@/lib/data/seed/generate";
import type { Provider } from "@/lib/validation/provider.schema";
import type { SearchParams } from "@/lib/validation/search.schema";
import type { Service } from "../validation/service.schema";

const PAGE_SIZE = 6;

export type SearchResultItem = {
  provider: Provider;
  matchedService: Service | null;
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
      if (!service.title.toLowerCase().includes(params.service)) return false;
    }
    // Filter by Category
    if (params.category) {
      if (service.category !== params.category) return false;
    }
    // Filter by Price
    if (params.price) {
      const { min, max } = params.price;
      const priceInDollars = service.priceCents / 100;
      if (priceInDollars < min || priceInDollars > max) return false;
    }
    return true;
  });

  return new Set(matched.map((s) => s.id));
}

function hasServiceLevelFilters(params: SearchParams): boolean {
  return Boolean(params.service || params.category || params.price);
}

function findMatchedService(
  provider: Provider,
  matchingServiceIds: Set<string>,
): Service | null {
  for (const id of provider.servicesIds) {
    if (matchingServiceIds.has(id)) {
      return services.find((s) => s.id === id) ?? null;
    }
  }
  return null;
}

export function searchProviders(params: SearchParams): SearchResult {
  let results = [...providers];
  const hasServiceFilters = hasServiceLevelFilters(params);
  let matchingServiceIds: Set<string> | null = null;

  // Filter by Service + Category + Price
  if (hasServiceFilters) {
    const ids = getMatchingServiceIds(params);
    matchingServiceIds = ids;

    results = results.filter((provider) =>
      provider.servicesIds.some((id) => ids.has(id)),
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

  // Filter by Availability
  if (params.availability === "true") {
    results = results.filter((provider) => provider.available);
  }

  // matchedService & effectivePrice

  const enriched = results.map((provider) => {
    const matchedService =
      hasServiceFilters && matchingServiceIds
        ? findMatchedService(provider, matchingServiceIds)
        : null;

    const effectivePrice =
      matchedService?.priceCents ?? provider.startingPrice * 100;

    return { provider, matchedService, effectivePrice };
  });

  // Sort
  switch (params.sort) {
    case "rating":
      enriched.sort((a, b) => b.provider.rating - a.provider.rating);
      break;
    case "price-low":
      enriched.sort((a, b) => a.effectivePrice - b.effectivePrice);
      break;
    case "price-high":
      enriched.sort((a, b) => b.effectivePrice - a.effectivePrice);
      break;
    case "availability":
      enriched.sort(
        (a, b) => Number(b.provider.available) - Number(a.provider.available),
      );
      break;
  }

  // Pagination
  const total = enriched.length;
  const page = params.page;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const items: SearchResultItem[] = enriched
    .slice(startIndex, endIndex)
    .map(({ provider, matchedService }) => ({ provider, matchedService }));

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  };
}
