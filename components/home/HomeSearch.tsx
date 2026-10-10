"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/lib/data/seed/generate";
import { services } from "@/lib/data/seed/generate";
import SearchForm from "../ui/SearchForm";

const servicesSet = [...new Set(services.map((s) => s.title))];
const locationsSet = [...new Set(locations.map((s) => s.name))];

export function HomeSearch() {
  const router = useRouter();

  const [service, setService] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (service) {
      params.set("service", String(service));
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const query = params.toString();

    router.push(query ? `/search?${query}` : "/search");
  }

  return (
    <div className="rounded-2xl p-5 transition-all hover:shadow-lg">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-end">
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
  );
}
