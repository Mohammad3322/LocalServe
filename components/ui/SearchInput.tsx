import { ComboBox, Label, ListBox } from "@heroui/react";
import MyInput from "./MyInput";

type SearchInputProps = {
  List: string[];
  inputValue: string | undefined;
  onInputChange: ((value: string) => void) | undefined;
};

function SearchInput({ List, inputValue, onInputChange }: SearchInputProps) {
  return (
    <div>
      <ComboBox
        className="w-full"
        inputValue={inputValue}
        onInputChange={onInputChange}
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
