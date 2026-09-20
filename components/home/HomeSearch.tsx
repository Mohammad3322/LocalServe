"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Key } from "@heroui/react";
import { ComboBox, Label, ListBox, Select, TextField } from "@heroui/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import MyButton from "../ui/MyButton";
import MyInput from "../ui/MyInput";
import { locations } from "@/lib/data/seed/locations";
import { services } from "@/lib/data/seed/services";

// const services = [
//   {
//     value: "solar-energy",
//     label: "Solar Energy",
//   },
//   {
//     value: "security-surveillance",
//     label: "Security & Surveillance",
//   },
//   {
//     value: "electronic-services",
//     label: "Electronic Services",
//   },
// ];

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
      className="border-border bg-surface rounded-2xl border p-3 shadow-lg"
    >
      <div className="grid items-center gap-3 md:grid-cols-[2fr_1fr_auto]">
        {/* <Select
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
        </Select> */}

        {/* Service */}
        <ComboBox
          className="w-full"
          inputValue={service}
          onInputChange={setService}
          allowsCustomValue
          menuTrigger="input"
        >
          <Label className="text-text-primary mb-2 block text-sm font-medium">
            What service do you need?
          </Label>

          <ComboBox.InputGroup>
            <MyInput placeholder="Search Service..." />

            <ComboBox.Trigger />
          </ComboBox.InputGroup>

          <ComboBox.Popover>
            <ListBox>
              {services.map((service) => (
                <ListBox.Item
                  key={service.id}
                  id={service.id}
                  textValue={service.title}
                >
                  <Label>{service.title}</Label>

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>

        {/* Location */}
        <ComboBox
          className="w-full"
          inputValue={location}
          onInputChange={setLocation}
          allowsCustomValue
          menuTrigger="input"
        >
          <Label className="text-text-primary mb-2 block text-sm font-medium">
            Location
          </Label>

          <ComboBox.InputGroup>
            <MyInput placeholder="Search location..." />

            <ComboBox.Trigger />
          </ComboBox.InputGroup>

          <ComboBox.Popover>
            <ListBox>
              {locations.map((location) => (
                <ListBox.Item
                  key={location.id}
                  id={location.id}
                  textValue={location.name}
                >
                  <Label>{location.name}</Label>

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>

        {/* Submit */}
        <MyButton
          type="submit"
          variant="primary"
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
