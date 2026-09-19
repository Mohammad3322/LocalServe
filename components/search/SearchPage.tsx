import { SearchHeader } from "./SearchHeader";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";

export function SearchPage() {
  return (
    <main className="bg-background min-h-screen">
      <SearchHeader />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <SearchFilters />

          <SearchResults />
        </div>
      </section>
    </main>
  );
}
