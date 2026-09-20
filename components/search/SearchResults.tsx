"use client";

import { Avatar, Card, Chip, Label, ListBox, Select } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { searchProviders } from "@/lib/services/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";
import { Pagination } from "./Pagination";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import Link from "next/link";
import MyButton from "../ui/MyButton";
import Image from "next/image";

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

  const params = searchParamsSchema.parse({
    service: searchParams.get("service") ?? undefined,

    location: searchParams.get("location") ?? undefined,

    category: searchParams.get("category") ?? undefined,

    rating: searchParams.get("rating") ?? undefined,

    availability: searchParams.get("availability") ?? undefined,

    sort: searchParams.get("sort") ?? "rating",

    page: searchParams.get("page") ?? "1",
  });

  const searchResult = searchProviders(params);

  const selectedSort = params.sort ?? "rating";

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
    <section>
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
          <Card
            key={provider.id}
            variant="default"
            className="h-full overflow-hidden transition-shadow duration-200 hover:shadow-lg"
          >
            <Card.Content className="flex h-full flex-col p-6">
              <div className="flex items-center gap-4">
                <Avatar
                  size="lg"
                  color="accent"
                  className="h-28 w-28 rounded-full"
                >
                  <Image
                    src={provider.imageUrl}
                    alt={provider.name}
                    width={200}
                    height={200}
                    className=""
                    // sizes="lg"
                  />

                  {/* <Avatar.Fallback>
                                {getInitials(provider.name)}
                              </Avatar.Fallback> */}
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Card.Title className="text-lg">{provider.name}</Card.Title>

                    {provider.verified && (
                      <Chip size="sm" variant="soft" color="accent">
                        <BadgeCheck className="size-3.5" />
                        Verified
                      </Chip>
                    )}
                  </div>

                  <Card.Description className="mt-1">
                    {provider.headline}
                  </Card.Description>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-current text-amber-500" />

                  <span className="text-text-primary text-sm font-semibold">
                    {provider.rating}
                  </span>
                </div>

                <span className="text-text-secondary text-sm">
                  ({provider.reviewCount} reviews)
                </span>
              </div>

              <div className="text-text-secondary mt-4 flex items-center gap-2 text-sm">
                <MapPin className="size-4 shrink-0" />

                <span>{provider.serviceArea}</span>
              </div>

              <div className="border-border mt-6 border-t pt-5">
                <p className="text-text-secondary text-xs">Starting from</p>

                <p className="text-text-primary mt-1 text-xl font-bold">
                  €{provider.startingPrice}
                </p>
              </div>

              <Link href={`/providers/${provider.slug}`} className="mt-6">
                <MyButton variant="secondary" fullWidth>
                  View Profile
                  <ArrowRight className="size-4" />
                </MyButton>
              </Link>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={searchResult.page}
        totalPages={searchResult.totalPages}
      />
    </section>
  );
}
