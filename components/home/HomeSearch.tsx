"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import MyButton from "../ui/MyButton";
import { locations } from "@/lib/data/seed/locations";
import { services } from "@/lib/data/seed/services";
import SearchInput from "../ui/SearchInput";

const servicesSet = [...new Set(services.map((s) => s.title))];
const locationsSet = [...new Set(locations.map((s) => s.name))];

export function HomeSearch() {
  const router = useRouter();

  const [service, setService] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

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
    <form
      onSubmit={handleSubmit}
      className="border-border bg-brand-700 rounded-2xl border p-5 shadow-lg"
    >
      <div className="grid items-end gap-3 md:grid-cols-[2fr_1fr_auto]">
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
        >
          <Search className="size-4" />
          Search
        </MyButton>
      </div>
    </form>
  );
}
