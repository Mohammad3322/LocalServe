import { Key, Label, ListBox, Select } from "@heroui/react";

const prices = [
  { id: "1", min: "0", max: "200", label: "$0 - $200" },
  { id: "2", min: "200", max: "400", label: "$200 - $400" },
  { id: "3", min: "400", max: "600", label: "$400 - $600" },
  { id: "4", min: "600", max: "800", label: "$600 - $800" },
  { id: "5", min: "800", max: "1000", label: "$800 - $1000" },
  { id: "6", min: "1000", max: "1200", label: "$1000 - $1200" },
  { id: "7", min: "1200", max: "1400", label: "$1200 - $1400" },
  { id: "8", min: "1400", max: "1600", label: "$1400 - $1600" },
  { id: "9", min: "1600", max: "1800", label: "$1600 - $1800" },
  { id: "10", min: "1800", max: "2000", label: "$1800 - $2000" },
];

type FilterSelectProps = {
  label: string;
  placeholder?: string | "";
  param: string;
  value: string;

  updateParam: (param: string, val: Key | null) => void;
};

function FilterSelect({
  placeholder,
  label,
  value,
  param,
  updateParam,
}: FilterSelectProps) {
  return (
    <Select
      placeholder={placeholder}
      value={value || null}
      onChange={(val) => updateParam(param, val)}
      className="h-full w-full"
    >
      <Label>{label}</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {prices.map((price) => (
            <ListBox.Item
              key={price.id}
              id={`${price.min}-${price.max}`}
              textValue={price.label}
            >
              <Label>{price.label}</Label>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export default FilterSelect;
