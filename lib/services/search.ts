import { providers } from "@/lib/data/seed/providers";
import { services } from "@/lib/data/seed/services";
import type { Provider } from "@/lib/validation/provider.schema";
import type { SearchParams } from "@/lib/validation/search.schema";

const PAGE_SIZE = 6;

export type SearchResult = {
  items: Provider[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function searchProviders(params: SearchParams): SearchResult {
  let results = [...providers];

  // Filter by location
  if (params.location) {
    const providerIds = new Set(
      providers
        .filter((provider) =>
          provider.serviceArea
            .toLowerCase()
            .includes(String(params.location).toLowerCase()),
        )
        .map((provider) => provider.id),
    );
    results = results.filter((provider) => providerIds.has(provider.id));
  }

  // Filter by Servics
  if (params.service) {
    const filterdServicesIds = services
      .filter((service) =>
        service.title
          .toLowerCase()
          .includes(String(params.service).toLowerCase()),
      )
      .map((service) => service.id);

    // console.log(filterdServicesIds);

    const providerIds = new Set(
      providers
        .filter((provider) =>
          provider.servicesIds.some((item) =>
            filterdServicesIds.includes(item),
          ),
        )
        .map((provider) => provider.id),
    );

    results = results.filter((provider) => providerIds.has(provider.id));
  }

  // Filter by category
  if (params.category) {
    const filterdServicesIds = services
      .filter((service) => service.category === params.category)
      .map((service) => service.id);

    const providerIds = new Set(
      providers
        .filter((provider) =>
          provider.servicesIds.some((item) =>
            filterdServicesIds.includes(item),
          ),
        )
        .map((provider) => provider.id),
    );

    results = results.filter((provider) => providerIds.has(provider.id));
  }

  // Filter by rating
  if (params.rating) {
    results = results.filter((provider) => provider.rating >= params.rating!);
  }

  // Filter by availability
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

  const total = results.length;
  const page = params.page;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const items = results.slice(startIndex, endIndex);

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  };
}
