"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { SearchApiResult } from "@/lib/api/search";
import type { SearchParams } from "@/lib/validation/search.schema";
// import type { Provider } from "@/lib/validation/provider.schema";

import { Pagination } from "./Pagination";
import ProviderCard from "../ui/ProviderCard";

const sortOptions = [
  {
    id: "rating",
    label: "Rating",
  },
  {
    id: "price-low",
    label: "Price: Low to High",
  },
  {
    id: "price-high",
    label: "Price: High to Low",
  },
  {
    id: "availability",
    label: "Availability",
  },
];

type Props = {
  initialData: SearchApiResult;
  initialParams: SearchParams;
};

export function SearchResults({ initialData, initialParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchResult = initialData;

  const selectedSort =
    searchParams.get("sort") ?? initialParams.sort ?? "rating";

  function updateSort(value: string | number | null) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      nextParams.set("sort", String(value));
    } else {
      nextParams.delete("sort");
    }

    nextParams.set("page", "1");

    router.push(`${pathname}?${nextParams.toString()}`);
  }

  return (
    <section id="searchResults" className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-text-primary text-lg font-semibold">
            Search Results
          </h2>

          <p className="text-text-secondary mt-1 text-sm">
            {searchResult.total} professionals found
          </p>
        </div>

        <Select
          className="w-full sm:w-56"
          value={selectedSort}
          onChange={updateSort}
          aria-label="Sort search results"
        >
          <Label>Sort by</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {sortOptions.map((option) => (
                <ListBox.Item
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                >
                  <Label>{option.label}</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5 space-y-4 md:grid-cols-2">
        {searchResult.items.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      <Pagination
        currentPage={searchResult.page}
        totalPages={searchResult.totalPages}
      />
    </section>
  );
}
