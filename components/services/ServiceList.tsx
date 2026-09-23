import type { ServiceCategory } from "@/lib/services/service-categories";

import { ServiceCard } from "./ServiceCard";

type ServiceListProps = {
  category: ServiceCategory;
};

export function ServiceList({ category }: ServiceListProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-text-primary text-3xl font-bold tracking-tight">
            Available services
          </h2>

          <p className="text-text-secondary mt-3 text-base leading-7">
            Choose a service to explore available professionals and booking
            options.
          </p>
        </div>

        {category.services.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {category.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                categorySlug={category.slug}
              />
            ))}
          </div>
        ) : (
          <div className="border-border bg-background mt-10 rounded-xl border p-10 text-center">
            <h3 className="text-text-primary font-semibold">
              No services available
            </h3>

            <p className="text-text-secondary mt-2 text-sm">
              There are currently no services available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
