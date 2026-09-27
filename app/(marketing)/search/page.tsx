import type { Metadata } from "next";
import { SearchPage } from "@/components/search/SearchPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search professionals",
  description:
    "Search local professionals by service, location, price and availability, " +
    "then compare ratings and book online.",
  path: "/search",
  // Section 8.6: the results page is a query interface, not a destination. Every
  // filter combination is a separate URL, so indexing them would flood the index
  // with near-duplicate pages. It stays crawlable so the links to provider
  // profiles are still followed.
  index: false,
});

export default function Page() {
  return <SearchPage />;
}
