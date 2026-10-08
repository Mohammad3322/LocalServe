import type { Metadata } from "next";
import { SearchPage } from "@/components/search/SearchPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search professionals",
  description:
    "Search local professionals by service, location, price and availability, " +
    "then compare ratings and book online.",
  path: "/search",
  index: false,
});

import { searchProviders } from "@/lib/api/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const raw = await searchParams;

  const flat = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  );

  const params = searchParamsSchema.parse({
    service: flat.service,
    location: flat.location,
    category: flat.category,
    rating: flat.rating,
    availability: flat.availability,
    sort: flat.sort ?? "rating",
    page: flat.page ?? "1",
  });

  const result = await searchProviders(params);

  return <SearchPage initialData={result} initialParams={params} />;
}
