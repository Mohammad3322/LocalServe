"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/seed/generate";
import SearchForm from "../ui/SearchForm";
import { Key } from "@heroui/react";

const servicesSet = [...new Set(services.map((s) => s.title))];

export function HomeSearch() {
  const router = useRouter();

  const [service, setService] = useState<Key | null>("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (service) {
      params.set("service", service.toString());
    }

    const query = params.toString();

    router.push(query ? `/search?${query}` : "/search");
  }

  return (
    <div className="rounded-2xl p-5 transition-all hover:shadow-lg">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-end">
        <SearchForm
          type="services"
          servicesSet={servicesSet}
          service={service}
          setService={setService}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
