"use client";

import { Label, Slider } from "@heroui/react";

type PriceFilterProps = {
  value: number[];
  onChange: (value: number[]) => void;
};

export default function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <Slider
      value={value}
      onChange={(val) => onChange(val as number[])}
      className="w-full max-w-xs"
      formatOptions={{
        currency: "USD",
        style: "currency",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }}
      maxValue={2000}
      minValue={0}
      step={5}
    >
      <Label className="text-text-primary">Price Range</Label>
      <Slider.Output className="text-text-primary" />
      <Slider.Track>
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  );
}
