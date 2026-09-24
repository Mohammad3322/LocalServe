"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import MyButton from "../ui/MyButton";
import { locations } from "@/lib/data/seed/locations";
import { services } from "@/lib/data/seed/services";
import SearchInput from "../ui/SearchInput";

export function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialService = searchParams.get("service") ?? "";

  const initialLocation = searchParams.get("location") ?? "";

  const [service, setService] = useState(initialService);

  const [location, setLocation] = useState(initialLocation);

  const servicesSet = [...new Set(services.map((s) => s.title))];
  const locationsSet = [...new Set(locations.map((s) => s.name))];

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
          <SearchInput
            List={servicesSet}
            inputValue={service}
            onInputChange={setService}
          />

          <SearchInput
            List={locationsSet}
            inputValue={location}
            onInputChange={setLocation}
          />

          <div className="flex items-end">
            <MyButton
              variant="primary"
              className="w-full md:w-auto"
              onPress={handleSearch}
            >
              <Search className="size-4" />
              Search
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
