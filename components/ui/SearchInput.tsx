import { ComboBox, Label, ListBox } from "@heroui/react";
import MyInput from "./MyInput";
import { DatabaseSearch, MapPinSearch } from "lucide-react";
import { ServicesSet } from "@/lib/validation/servicesSet.schema";

type SearchInputProps = {
  servicesSet: ServicesSet[];
  inputValue: string | undefined;
  onInputChange: ((value: string) => void) | undefined;
  label: string;
  labelSize?: "sm" | "lg";
  placeholder: string;
  className?: string;
  icon?: "location" | "services";
};

function SearchInput({
  servicesSet,
  inputValue,
  onInputChange,
  label,
  labelSize,
  placeholder,
  className,
  icon,
}: SearchInputProps) {
  return (
    <div>
      <ComboBox
        className={`w-full ${className}`}
        inputValue={inputValue}
        onInputChange={onInputChange}
        allowsCustomValue
        menuTrigger="input"
      >
        <Label
          className={`text-surface mb-2 flex items-end justify-end gap-2 text-${labelSize ?? "sm"} font-medium`}
        >
          {icon === "location" ? (
            <>
              <MapPinSearch size={20} />
              <p className="min-w-40 text-start">{label}</p>
            </>
          ) : (
            <>
              <DatabaseSearch size={28} />
              <p className="min-w-60 text-start">{label}</p>
            </>
          )}
        </Label>

        <ComboBox.InputGroup>
          <MyInput placeholder={placeholder} />

          <ComboBox.Trigger />
        </ComboBox.InputGroup>

        <ComboBox.Popover>
          <ListBox>
            {servicesSet.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.title}>
                <Label>{item.title}</Label>

                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
    </div>
  );
}

export default SearchInput;
