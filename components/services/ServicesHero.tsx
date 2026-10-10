"use client";

import SearchInput from "../ui/SearchInput";
import { useState } from "react";
import { services } from "@/lib/data/seed/generate";
import MyButton from "../ui/MyButton";
import Link from "next/link";

const servicesSet = [...new Set(services.map((s) => s.title))];

export function ServicesHero() {
  const [service, setService] = useState<string>("");

  return (
    <section className="border-border bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="bg-brand-50 text-brand-700 inline-flex rounded-full px-3 py-1 text-sm font-medium">
            LocalServe Services
          </span>

          <h1 className="text-text-primary mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore our services
          </h1>

          <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            Discover trusted local professionals and services for your home and
            business needs.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col items-end justify-center gap-3 sm:flex-row">
            <SearchInput
              label="What service do you need?"
              List={servicesSet}
              inputValue={service}
              onInputChange={setService}
              placeholder="Search Sevice"
            />
            <Link href={`/search?service=${service}`}>
              <MyButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Search
              </MyButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
