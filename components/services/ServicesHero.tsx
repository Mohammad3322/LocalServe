"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/seed/generate";
import SearchForm from "../ui/SearchForm";
import { Key } from "@heroui/react";

const servicesSet = [...new Set(services.map((s) => s.title))];

export function ServicesHero() {
  const router = useRouter();
  const [service, setService] = useState<Key | null>("");

  function handleSearch() {
    const trimmed = service?.toString().trim();
    if (!trimmed) return;

    const params = new URLSearchParams({ service: trimmed });
    router.push(`/services?${params.toString()}#services`);
  }

  return (
    <section className="border-border bg-brand-700 border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-8 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col justify-center text-center">
          <h1 className="text-surface mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore our services
          </h1>

          <p className="text-brand-50 mx-auto mt-5 max-w-3xl text-base leading-7 sm:text-lg">
            Discover trusted local professionals and services for your home and
            business needs.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col items-end justify-end gap-3 sm:flex-row">
            <SearchForm
              type="services"
              servicesSet={servicesSet}
              service={service}
              setService={setService}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
