"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { searchProviders } from "@/lib/services/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";
import { Pagination } from "./Pagination";
import ProviderCard from "../ui/ProviderCard";
import Filters from "./Filters";

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

export function SearchResults() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = searchParamsSchema.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const searchResult = searchProviders(params);

  const selectedSort = params.sort;

  function updateSort(value: string | number | null) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      nextParams.set("sort", String(value));
    } else {
      nextParams.delete("sort");
    }

    nextParams.set("page", "1");

    router.push(`${pathname}?${nextParams.toString()}#searchResults`);
  }

  // console.log(pathname);

  return (
    <section id="searchResults" className="w-full">
      <div className="mb-12 flex flex-col items-center gap-4 lg:flex-row-reverse lg:items-end lg:justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:gap-5">
          <div className="bg-brand-700 w-full rounded-4xl px-5 py-2">
            <Filters />
          </div>
          <Select
            className="bg-brand-700 w-full rounded-3xl px-3 py-2.5 md:w-56"
            value={selectedSort}
            onChange={updateSort}
            aria-label="Sort search results"
          >
            <Label className="text-surface font-semibold">Sort by</Label>

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

        <div className="min-w-32">
          <h2 className="text-text-primary text-lg font-semibold">
            Search Results
          </h2>

          <p className="text-text-secondary mt-1 text-sm">
            {searchResult.total} professionals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 space-y-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResult.items.map((item) => (
          <ProviderCard key={item.provider.id} item={item} />
        ))}
      </div>

      <Pagination
        currentPage={searchResult.page}
        totalPages={searchResult.totalPages}
      />
    </section>
  );
}
