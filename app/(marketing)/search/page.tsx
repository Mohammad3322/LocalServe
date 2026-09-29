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

export default function Page() {
  return <SearchPage />;
}
