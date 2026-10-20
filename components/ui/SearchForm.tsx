import MyButton from "./MyButton";
import { Search } from "lucide-react";
import { Key } from "@heroui/react";
import { servicesSet } from "@/lib/data/seed/sevicesSet";
import { FilterAutoComplete } from "./FilterAutoComplete";

type SearchFormProps = {
  type?: "services";
  service: Key | null;
  setService: (value: Key | null) => void;
  handleSearch: () => void;
};

function SearchForm({
  type,
  service,
  setService,
  handleSearch,
}: SearchFormProps) {
  const servicesTitels = servicesSet.map((service) => service.title);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:items-end">
      <FilterAutoComplete
        label="What service do you need?"
        List={servicesTitels}
        objectList={servicesSet}
        value={service}
        onChange={setService}
        placeholder="Service"
        className="w-60 md:w-72 lg:w-80"
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
