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
      className="min-h-80 w-full max-w-xs"
      formatOptions={{
        currency: "USD",
        style: "currency",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }}
      maxValue={5000}
      minValue={0}
      step={5}
      orientation="vertical"
    >
      <Label className="text-text-primary">Price Range</Label>
      <Slider.Output className="text-text-primary" />
      <Slider.Track dir="ltr">
        {({ state }) => (
          <>
            <Slider.Fill className="direction-alternate-reverse" />
            {state.values.map((_, i) => (
              <Slider.Thumb
                key={i}
                index={i}
                className="direction-alternate-reverse"
              />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  );
}
