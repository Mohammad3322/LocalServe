import type { ServiceCategory } from "@/lib/services/service-categories";

type ServiceCategoryHeroProps = {
  category: ServiceCategory;
};

export function ServiceCategoryHero({ category }: ServiceCategoryHeroProps) {
  return (
    <section className="border-border bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-brand-600 text-sm font-semibold">Services</p>

          <h1 className="text-text-primary mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {category.title}
          </h1>

          <p className="text-text-secondary mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            {category.description}
          </p>

          <div className="text-text-secondary mt-8 flex flex-wrap gap-3 text-sm">
            <span className="bg-brand-50 text-brand-700 rounded-full px-3 py-1.5">
              {category.services.length} services
            </span>

            <span className="bg-surface rounded-full px-3 py-1.5">
              Trusted local professionals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
