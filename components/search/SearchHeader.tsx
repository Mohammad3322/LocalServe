"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { locations } from "@/lib/data/seed/generate";
import { services } from "@/lib/data/seed/generate";
import SearchForm from "../ui/SearchForm";

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
        <div className="space-y-2 text-center">
          <h1 className="text-surface text-2xl font-semibold sm:text-3xl">
            Find a Professional
          </h1>

          <p className="text-brand-100 text-sm sm:text-base">
            Compare trusted local professionals and find the right service for
            you.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 md:flex-row md:items-end">
          <SearchForm
            servicesSet={servicesSet}
            service={service}
            setService={setService}
            locationsSet={locationsSet}
            location={location}
            setLocation={setLocation}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </section>
  );
}
