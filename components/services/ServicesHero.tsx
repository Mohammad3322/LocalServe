"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchForm from "../ui/SearchForm";
import { Key } from "@heroui/react";

export function ServicesHero() {
  const router = useRouter();
  const [service, setService] = useState<Key | null>("");

  // function handleSearch() {
  //   if (!service) {
  //     router.push(`/services`);
  //   } else {
  //     const StringService = service.toString();
  //     const params = new URLSearchParams({ service: StringService });
  //     router.push(`/services?${params.toString()}#services`);
  //   }
  // }
  function handleSearch() {
    const params = new URLSearchParams();

    if (service) {
      params.set("service", service.toString());
    }

    const query = params.toString();

    router.push(query ? `/services?${query}#serviceResults` : "/services");
  }

  return (
    <section className="border-border bg-brand-700 border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
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
