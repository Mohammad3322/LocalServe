import { serviceCategories } from "@/lib/data/seed/categories";
import { ServiceCategoryCard } from "./ServiceCategoryCard";
import { services } from "@/lib/data/seed/generate";
import { SearchServiceResults } from "./SearchServiceResults";

type ServiceCategoriesProps = {
  serviceQuery?: string;
};

export function ServiceCategories({ serviceQuery }: ServiceCategoriesProps) {
  const filteredServices = serviceQuery
    ? services.filter((s) =>
        s.title.toLowerCase().includes(serviceQuery.toLowerCase()),
      )
    : null;

  if (serviceQuery && filteredServices) {
    return <SearchServiceResults filteredServices={filteredServices} />;
  }

  return (
    <section className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-text-primary mt-2 text-3xl font-bold tracking-tight">
            Find the right service for your needs
          </h2>

          <p className="text-text-secondary mt-4 text-base leading-7">
            Explore our service categories and connect with professionals who
            can help.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
