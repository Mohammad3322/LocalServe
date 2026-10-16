"use client";

import type { Key } from "@heroui/react";
import { Checkbox, Label, ListBox, Select } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyButton from "../ui/MyButton";
import { serviceCategories } from "@/lib/data/seed/categories";

const ratings = [
  {
    id: "5",
    label: "5 stars",
  },
  {
    id: "4",
    label: "4+ stars",
  },
  {
    id: "3",
    label: "3+ stars",
  },
];
const prices = [
  { min: "0", max: "200", label: "$0 - $200" },
  { min: "200", max: "400", label: "$200 - $400" },
  { min: "400", max: "600", label: "$400 - $600" },
  { min: "600", max: "800", label: "$600 - $800" },
  { min: "800", max: "1000", label: "$800 - $1000" },
  { min: "1000", max: "1200", label: "$1000 - $1200" },
  { min: "1200", max: "1400", label: "$1200 - $1400" },
  { min: "1400", max: "1600", label: "$1400 - $1600" },
  { min: "1600", max: "1800", label: "$1600 - $1800" },
  { min: "1800", max: "2000", label: "$1800 - $2000" },
];

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const selectedRating = searchParams.get("rating") ?? "";
  const selectedPrice = searchParams.get("price") ?? "";

  const availability = searchParams.get("availability") === "true";

  function updateParam(key: string, value: Key | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}#searchResults`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("rating");
    params.delete("price");
    params.delete("availability");

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="">
      <div className="border-border bg-surface sticky top-12 min-w-72 rounded-xl border px-5 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-text-primary text-base font-semibold">Filters</h2>

          <MyButton
            variant="secondary"
            type="button"
            size="sm"
            onClick={clearFilters}
            className="text-sm font-medium"
          >
            Clear all
          </MyButton>
        </div>

        <div className="my-6 flex w-full flex-col gap-5 sm:flex-row">
          {/* Category */}
          {/* <Select
            className="h-full w-full"
            placeholder="All services"
            value={selectedCategory || null}
            onChange={(value) => updateParam("category", value)}
          >
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {serviceCategories.map((category) => (
                  <ListBox.Item
                    key={category.id}
                    id={category.id}
                    textValue={category.title}
                  >
                    <Label>{category.title}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select> */}

          {/* Rating */}
          {/* <Select
            className="w-full"
            placeholder="Any rating"
            value={selectedRating || null}
            onChange={(value) => updateParam("rating", value)}
          >
            <Label>Minimum Rating</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {ratings.map((rating) => (
                  <ListBox.Item
                    key={rating.id}
                    id={rating.id}
                    textValue={rating.label}
                  >
                    <Label>{rating.label}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select> */}

          {/* Price */}
          <Select
            className="h-full w-full"
            placeholder="Any price"
            value={selectedPrice || null}
            onChange={(value) => updateParam("price", value)}
          >
            <Label>Price</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {prices.map((price) => (
                  <ListBox.Item
                    key={price.max}
                    id={`${price.min}-${price.max}`}
                    textValue={price.label}
                  >
                    <Label>{price.label}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Availability */}
        <div>
          <Checkbox
            id="available"
            isSelected={availability}
            onChange={(isSelected) =>
              updateParam("availability", isSelected ? "true" : null)
            }
          >
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>

              <span className="text-text-secondary text-sm">Available</span>
            </Checkbox.Content>
          </Checkbox>
        </div>
      </div>
    </aside>
  );
}
