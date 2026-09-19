"use client";

import type { Key } from "@heroui/react";
import { Checkbox, Label, ListBox, Select } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const services = [
  {
    id: "solar-energy",
    label: "Solar Energy",
  },
  {
    id: "security-surveillance",
    label: "Security & Surveillance",
  },
  {
    id: "electronic-services",
    label: "Electronic Services",
  },
];

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

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service") ?? "";
  const selectedRating = searchParams.get("rating") ?? "";

  const availability = searchParams.get("availability") === "true";

  function updateParam(key: string, value: Key | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("service");
    params.delete("rating");
    params.delete("availability");

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="hidden lg:block">
      <div className="border-border bg-surface sticky top-24 rounded-xl border p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-text-primary text-base font-semibold">Filters</h2>

          <button
            type="button"
            onClick={clearFilters}
            className="text-brand-600 hover:text-brand-700 text-sm font-medium transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="mt-6 space-y-7">
          {/* Service */}
          <Select
            className="w-full"
            placeholder="All services"
            value={selectedService || null}
            onChange={(value) => updateParam("service", value)}
          >
            <Label>Service</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {services.map((service) => (
                  <ListBox.Item
                    key={service.id}
                    id={service.id}
                    textValue={service.label}
                  >
                    <Label>{service.label}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Rating */}
          <Select
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
          </Select>

          {/* Availability */}
          <div>
            <p className="text-text-primary mb-3 text-sm font-medium">
              Availability
            </p>

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

                <span className="text-text-secondary text-sm">
                  Available for booking
                </span>
              </Checkbox.Content>
            </Checkbox>
          </div>
        </div>
      </div>
    </aside>
  );
}
