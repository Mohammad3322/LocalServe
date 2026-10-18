"use client";

import { Checkbox, Key } from "@heroui/react";
import { FilterAutoComplete } from "../ui/FilterAutoComplete";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locations, services } from "@/lib/data/seed/generate";
import PriceFilter from "../ui/PriceFilter";
import { useState } from "react";
import MyModal from "../ui/MyModal";

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";

  const servicesSet = category
    ? [
        ...new Set(
          services
            .filter((service) => service.category === category)
            .map((s) => s.title),
        ),
      ]
    : [...new Set(services.map((s) => s.title))];

  const service = searchParams.get("service") ?? null;

  const location = searchParams.get("location") ?? null;

  const locationsSet = [...new Set(locations.map((s) => s.name))];

  const availability = searchParams.get("availability") === "true";

  const priceFromUrl = searchParams.get("price");

  const DEFAULT_PRICE = [0, 2000] as [number, number];

  const confirmedPrice = priceFromUrl
    ? (priceFromUrl.split("-").map(Number) as [number, number])
    : DEFAULT_PRICE;

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const [tempPrice, setTempPrice] = useState<number[]>(confirmedPrice);

  //   const [localPrice, setLocalPrice] = useState<number[]>(defaultRange);

  function updateParam(key: string, value: Key | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== null && value !== "") {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleOpenPriceModal = (open: boolean) => {
    if (open) setTempPrice(confirmedPrice);
    setIsPriceModalOpen(open);
  };

  const handleConfirmPrice = () => {
    updateParam("price", `${tempPrice[0]}-${tempPrice[1]}`);
    setIsPriceModalOpen(false);
  };

  const handleResetPrice = () => {
    setTempPrice(DEFAULT_PRICE);
  };

  const priceButtonLabel = `$${confirmedPrice[0]} - $${confirmedPrice[1]}`;

  function updateBooleanParam(key: string, value: boolean) {
    updateParam(key, value ? "true" : null);
  }

  //   function clearFilters() {
  //     const params = new URLSearchParams(searchParams.toString());

  //     params.delete("category");
  //     params.delete("price");
  //     params.delete("availability");

  //     params.set("page", "1");

  //     router.push(`${pathname}?${params.toString()}`);
  //   }

  return (
    <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-end">
      <FilterAutoComplete
        label="Where do you need it?"
        List={servicesSet}
        value={service}
        onChange={(value) => updateParam("service", value)}
        placeholder="Search Service"
      />
      <FilterAutoComplete
        label="Where do you need it?"
        List={locationsSet}
        value={location}
        onChange={(value) => updateParam("location", value)}
        placeholder="Search Location"
      />

      <MyModal
        isOpen={isPriceModalOpen}
        onOpenChange={handleOpenPriceModal}
        onConfirm={handleConfirmPrice}
        onReset={handleResetPrice}
        confirmLabel={priceButtonLabel}
      >
        <PriceFilter value={tempPrice} onChange={setTempPrice} />
      </MyModal>

      <div>
        <Checkbox
          id="available"
          isSelected={availability}
          onChange={(isSelected) =>
            updateBooleanParam("availability", isSelected)
          }
        >
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>

            <span className="text-surface text-sm">Available</span>
          </Checkbox.Content>
        </Checkbox>
      </div>
    </div>
  );
}

export default Filters;
