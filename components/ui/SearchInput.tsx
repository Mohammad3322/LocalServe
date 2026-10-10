import { ComboBox, Label, ListBox } from "@heroui/react";
import MyInput from "./MyInput";
import { DatabaseSearch, MapPinSearch } from "lucide-react";

type SearchInputProps = {
  List: string[];
  inputValue: string | undefined;
  onInputChange: ((value: string) => void) | undefined;
  label: string;
  labelSize?: "sm" | "lg";
  placeholder: string;
  className?: string;
  icon?: "location" | "services";
};

function SearchInput({
  List,
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
            <MapPinSearch size={20} />
          ) : (
            <DatabaseSearch size={28} />
          )}
          <p>{label}</p>
        </Label>

        <ComboBox.InputGroup>
          <MyInput placeholder={placeholder} />

          <ComboBox.Trigger />
        </ComboBox.InputGroup>

        <ComboBox.Popover>
          <ListBox>
            {List.map((item) => (
              <ListBox.Item key={item} id={item} textValue={item}>
                <Label>{item}</Label>

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
