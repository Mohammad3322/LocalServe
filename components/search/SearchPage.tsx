import { SearchHeader } from "./SearchHeader";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";

export function SearchPage() {
  return (
    <main className="bg-brand-50 min-h-screen">
      <SearchHeader />

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.5fr_1fr]">
          <SearchFilters />

          <SearchResults />
        </div>
      </section>
    </main>
  );
}
