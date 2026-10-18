import { SearchHeader } from "./SearchHeader";
import { SearchResults } from "./SearchResults";

export async function SearchPage() {
  return (
    <main className="bg-brand-50 min-h-screen">
      <SearchHeader />

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <SearchResults />
      </section>
    </main>
  );
}
