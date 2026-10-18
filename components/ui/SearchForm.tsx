import MyButton from "./MyButton";
import { Search } from "lucide-react";
import { Key } from "@heroui/react";
import SearchInput from "./SearchInput";

type SearchFormProps = {
  type?: "services";
  servicesSet: string[];
  service: Key | null;
  setService: (value: Key | null) => void;
  handleSearch: () => void;
};

function SearchForm({
  type,
  servicesSet,
  service,
  setService,

  handleSearch,
}: SearchFormProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:items-end">
      <SearchInput
        label="What service do you need?"
        labelSize="lg"
        List={servicesSet}
        inputValue={service?.toString()}
        onInputChange={setService}
        placeholder="Search Sevice"
        className="max-w-96"
      />

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
    </div>
  );
}

export default SearchForm;
