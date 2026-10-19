"use client";

import type { Key } from "@heroui/react";
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";
import { useState } from "react";

type FilterAutoCompleteProps = {
  List: string[];
  objectList?: { id: string; title: string; category: string }[];
  value: Key | null;
  onChange?: (value: Key | null) => void;
  label?: string;
  placeholder: string;
  className?: string;
};

export function FilterAutoComplete({
  List,
  objectList,
  value,
  onChange,
  label,
  placeholder,
  className,
}: FilterAutoCompleteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { contains } = useFilter({ sensitivity: "base" });

  const customFilter = (text: string, inputValue: string) => {
    if (!inputValue) return true;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
    return contains(text, inputValue);
  };

  return (
    <Autocomplete
      className={` ${className}`}
      placeholder={placeholder}
      selectionMode="single"
      value={value}
      onChange={onChange}
    >
      <Label className="text-surface text-start font-semibold">{label}</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={customFilter}>
          <SearchField
            autoFocus
            aria-label="Search"
            name="search"
            variant="secondary"
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder={placeholder} />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox
            renderEmptyState={() => (
              <EmptyState>
                {isLoading ? "Searching..." : "No results found"}
              </EmptyState>
            )}
          >
            {objectList
              ? objectList.map((item) => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.title}
                  >
                    <Label>{item.title}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))
              : List.map((item) => (
                  <ListBox.Item key={item} id={item} textValue={item}>
                    <Label>{item}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
