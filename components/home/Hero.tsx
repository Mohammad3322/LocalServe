import { CheckCircle2 } from "lucide-react";
import { HomeSearch } from "@/components/home/HomeSearch";

export function Hero() {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="border-border bg-surface text-text-secondary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
            <CheckCircle2 className="text-brand-600 size-4" />
            Trusted local professionals
          </div>

          <h1 className="text-text-primary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find trusted professionals near you
          </h1>

          <p className="text-text-secondary mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg">
            Discover local professionals, compare their services, and book the
            right appointment for your needs.
          </p>

          <div className="mx-auto mt-10 max-w-4xl">
            <HomeSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
