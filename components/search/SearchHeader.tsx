"use client";

import { Button, ComboBox, Input, Label, ListBox } from "@heroui/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { locations } from "@/lib/data/seed/locations";

export function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialService = searchParams.get("service") ?? "";

  const initialLocation = searchParams.get("location") ?? "";

  const [service, setService] = useState(initialService);

  const [location, setLocation] = useState(initialLocation);

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (service.trim()) {
      params.set("service", service.trim());
    } else {
      params.delete("service");
    }

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-text-primary text-2xl font-semibold sm:text-3xl">
            Find a Professional
          </h1>

          <p className="text-text-secondary text-sm sm:text-base">
            Compare trusted local professionals and find the right service for
            you.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <Label
              htmlFor="service-search"
              className="text-text-primary mb-2 block text-sm font-medium"
            >
              Service
            </Label>

            <Input
              id="service-search"
              value={service}
              onChange={(event) => setService(event.target.value)}
              placeholder="Search services..."
              className="w-full"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <ComboBox
            className="w-full"
            inputValue={location}
            onInputChange={setLocation}
            allowsCustomValue
            menuTrigger="input"
          >
            <Label className="text-text-primary mb-2 block text-sm font-medium">
              Location
            </Label>

            <ComboBox.InputGroup>
              <Input placeholder="Search location..." />

              <ComboBox.Trigger />
            </ComboBox.InputGroup>

            <ComboBox.Popover>
              <ListBox>
                {locations.map((location) => (
                  <ListBox.Item
                    key={location.id}
                    id={location.id}
                    textValue={location.name}
                  >
                    <Label>{location.name}</Label>

                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </ComboBox.Popover>
          </ComboBox>

          <div className="flex items-end">
            <Button
              variant="primary"
              className="w-full md:w-auto"
              onPress={handleSearch}
            >
              <Search className="size-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
