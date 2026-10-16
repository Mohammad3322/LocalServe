import React from "react";
import SearchInput from "./SearchInput";
import MyButton from "./MyButton";
import { Search } from "lucide-react";

type SearchFormProps = {
  type?: "services" | "all";
  servicesSet: string[];
  service: string;
  setService: (value: string) => void;
  locationsSet?: string[];
  location?: string;
  setLocation?: (value: string) => void;
  handleSearch: () => void;
};

function SearchForm({
  type,
  servicesSet,
  service,
  setService,
  locationsSet,
  location,
  setLocation,
  handleSearch,
}: SearchFormProps) {
  return (
    <>
      <SearchInput
        label="What service do you need?"
        labelSize="lg"
        List={servicesSet}
        inputValue={service}
        onInputChange={setService}
        placeholder="Search Sevice"
        className="max-w-96"
      />

      {/* Location */}
      {type && type === "all" ? (
        <SearchInput
          label="Where do you need it?"
          List={locationsSet ?? []}
          inputValue={location ?? undefined}
          onInputChange={setLocation}
          placeholder="Search location"
          icon="location"
          className="max-w-60"
        />
      ) : (
        ""
      )}

      {/* Submit */}
      <MyButton
        onClick={handleSearch}
        variant="primary"
        size="sm"
        className="bg-brand-600 border-surface text-surface min-h-10 justify-self-center rounded-4xl! border"
      >
        <Search className="size-5" />
        <p className="font-semibold">
          {type === "services" ? "Search for services" : "Search for providers"}
        </p>
      </MyButton>
    </>
  );
}

export default SearchForm;
