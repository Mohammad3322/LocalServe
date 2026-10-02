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

    router.push(`/search?${params.toString()}#searchResults`);
  }

  return (
    <section className="border-border bg-brand-700 border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-surface text-2xl font-semibold sm:text-3xl">
            Find a Professional
          </h1>

          <p className="text-brand-100 text-sm sm:text-base">
            Compare trusted local professionals and find the right service for
            you.
          </p>
        </div>

        <div className="mt-6 grid items-end gap-3 md:grid-cols-[2fr_1fr_auto]">
          {/* Service */}
          <SearchInput
            label="What service do you need?"
            List={servicesSet}
            inputValue={service}
            onInputChange={setService}
            placeholder="Search Sevice"
          />

          {/* Location */}
          <SearchInput
            label="Where do you need it?"
            List={locationsSet}
            inputValue={location}
            onInputChange={setLocation}
            placeholder="Search location where y..."
          />

          {/* Submit */}
          <MyButton
            type="submit"
            variant="secondary"
            size="sm"
            className="bg-brand-500 min-h-10"
            onPress={handleSearch}
          >
            <Search className="size-4" />
            Search
          </MyButton>
        </div>
      </div>
    </section>
  );
}
