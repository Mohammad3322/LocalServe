import Link from "next/link";
import { Button } from "@heroui/react";
import { Search } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="border-border bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="bg-brand-50 text-brand-700 inline-flex rounded-full px-3 py-1 text-sm font-medium">
            LocalServe Services
          </span>

          <h1 className="text-text-primary mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore our services
          </h1>

          <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            Discover trusted local professionals and services for your home and
            business needs.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="border-border bg-surface flex min-h-12 flex-1 items-center gap-3 rounded-xl border px-4 shadow-sm">
              <Search className="text-text-secondary size-5 shrink-0" />

              <input
                type="text"
                placeholder="Search for a service..."
                className="text-text-primary placeholder:text-text-secondary min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            <Link href="/search">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
