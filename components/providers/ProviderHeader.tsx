import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, MapPin, Star } from "lucide-react";
import { Button } from "@heroui/react";

import type { Provider } from "@/lib/validation/provider.schema";

type ProviderHeaderProps = {
  provider: Provider;
};

export function ProviderHeader({ provider }: ProviderHeaderProps) {
  return (
    <section className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-text-secondary hover:text-brand-600 transition-colors"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true" className="text-text-secondary">
              /
            </li>

            <li>
              <Link
                href="/search"
                className="text-text-secondary hover:text-brand-600 transition-colors"
              >
                Search
              </Link>
            </li>

            <li aria-hidden="true" className="text-text-secondary">
              /
            </li>

            <li
              aria-current="page"
              className="text-text-primary truncate font-medium"
            >
              {provider.name}
            </li>
          </ol>
        </nav>

        {/* Provider Hero */}
        <div className="grid gap-8 lg:grid-cols-[220px_1fr_auto] lg:items-center">
          {/* Image */}
          <div className="bg-background relative mx-auto aspect-square w-full max-w-56 overflow-hidden rounded-2xl lg:mx-0">
            <Image
              src={provider.imageUrl}
              alt={provider.name}
              fill
              sizes="(max-width: 1024px) 224px, 224px"
              className="object-cover"
              priority
            />
          </div>

          {/* Information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-text-primary text-2xl font-semibold tracking-tight sm:text-3xl">
                {provider.name}
              </h1>

              {provider.verified && (
                <span className="bg-brand-50 text-brand-700 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium">
                  <BadgeCheck className="size-4" />
                  Verified
                </span>
              )}
            </div>

            <p className="text-text-secondary mt-2 text-base">
              {provider.headline}
            </p>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="size-5 fill-current text-amber-500" />

                <span className="text-text-primary font-semibold">
                  {provider.rating.toFixed(1)}
                </span>

                <span className="text-text-secondary text-sm">
                  ({provider.reviewCount} reviews)
                </span>
              </div>

              <div className="bg-border hidden h-4 w-px sm:block" />

              {/* Service Area */}
              <div className="text-text-secondary flex items-center gap-1.5 text-sm">
                <MapPin className="size-4 shrink-0" />

                <span>{provider.serviceArea}</span>
              </div>
            </div>

            {/* Experience */}
            <div className="text-text-secondary mt-4 flex items-center gap-1.5 text-sm">
              <CalendarDays className="size-4 shrink-0" />

              <span>{provider.experienceYears} years of experience</span>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:self-center">
            <Link href="#services">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Book a Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
