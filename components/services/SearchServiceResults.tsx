import { ServiceCard } from "./ServiceCard";
import { Service } from "@/lib/validation/service.schema";

type SearchServiceResults = {
  filteredServices: Service[];
};

export function SearchServiceResults({
  filteredServices,
}: SearchServiceResults) {
  return (
    <section id="serviceResults" className="bg-surface">
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

        {filteredServices.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="border-border bg-background mt-10 rounded-xl border p-10 text-center">
            <h3 className="text-text-primary font-semibold">
              No services matche your search
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
