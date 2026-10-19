"use client";

import { Checkbox, Key } from "@heroui/react";
import { FilterAutoComplete } from "../ui/FilterAutoComplete";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locations } from "@/lib/data/seed/generate";
import PriceFilter from "../ui/PriceFilter";
import { useState } from "react";
import MyModal from "../ui/MyModal";
import { FunnelX } from "lucide-react";
import { servicesSet } from "@/lib/data/seed/sevicesSet";

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";

  const servicesList = category
    ? servicesSet
        .filter((service) => service.category === category)
        .map((s) => s)
    : servicesSet.map((s) => s);

  const servicesTitels = servicesList.map((service) => service.title);

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

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("service");
    params.delete("location");
    params.delete("price");
    params.delete("availability");

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-end">
      <div className="flex items-end justify-center gap-5 p-1">
        <FilterAutoComplete
          label="Choose Service"
          List={servicesTitels}
          objectList={servicesList}
          value={service}
          onChange={(value) => updateParam("service", value)}
          placeholder="Service"
        />
        <FilterAutoComplete
          label="Where do you need it?"
          List={locationsSet}
          value={location}
          onChange={(value) => updateParam("location", value)}
          placeholder="Location"
        />
      </div>
      <div className="flex items-start justify-start gap-5">
        <div className="flex justify-center gap-5">
          <div className="flex flex-col gap-1 p-1">
            <label className="text-surface text-sm font-semibold">
              Price range
            </label>
            <MyModal
              isOpen={isPriceModalOpen}
              onOpenChange={handleOpenPriceModal}
              onConfirm={handleConfirmPrice}
              onReset={handleResetPrice}
              confirmLabel={priceButtonLabel}
            >
              <PriceFilter value={tempPrice} onChange={setTempPrice} />
            </MyModal>
          </div>

          <div className="flex flex-col gap-1 p-1">
            <Checkbox
              id="available"
              isSelected={availability}
              onChange={(isSelected) =>
                updateBooleanParam("availability", isSelected)
              }
            >
              <Checkbox.Content className="flex flex-col gap-1">
                <span className="text-surface text-sm font-semibold">
                  Available
                </span>
                <Checkbox.Control className="size-8">
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Content>
            </Checkbox>
          </div>
        </div>
        <div
          onClick={clearFilters}
          className="hover:bg-brand-500 flex cursor-pointer flex-col items-start justify-start rounded-2xl p-1 transition-colors"
        >
          <label className="text-surface text-sm font-semibold">Clear</label>
          <FunnelX className="text-surface size-9" />
        </div>
      </div>
    </div>
  );
}

export default Filters;
