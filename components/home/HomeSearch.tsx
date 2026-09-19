"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Key } from "@heroui/react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    value: "solar-energy",
    label: "Solar Energy",
  },
  {
    value: "security-surveillance",
    label: "Security & Surveillance",
  },
  {
    value: "electronic-services",
    label: "Electronic Services",
  },
];

export function HomeSearch() {
  const router = useRouter();

  const [service, setService] = useState<Key | null>(null);
  const [location, setLocation] = useState("");

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
      className="border-border bg-surface rounded-2xl border p-3 shadow-lg"
    >
      <div className="grid items-center gap-3 md:grid-cols-[2fr_1fr_auto]">
        {/* Service */}
        <Select
          value={service}
          variant="primary"
          onChange={setService}
          placeholder="Select a service"
          className="w-full"
        >
          <Label>What service do you need?</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {services.map((item) => (
                <ListBox.Item
                  key={item.value}
                  id={item.value}
                  textValue={item.label}
                >
                  {item.label}

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Location */}
        <TextField className="w-full">
          <Label>Where?</Label>

          <Input
            placeholder="City or service area"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            // variant="primary"
            className="focus:border-brand-500!"
          />
        </TextField>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="bg-brand-500 min-h-10"
        >
          <Search className="size-4" />
          Search
        </Button>
      </div>
    </form>
  );
}
