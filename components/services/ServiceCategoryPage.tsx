import type { ServiceCategory } from "@/lib/services/service-categories";

import { ServiceCategoryCTA } from "./ServiceCategoryCTA";
import { ServiceCategoryHero } from "./ServiceCategoryHero";
import { ServiceList } from "./ServiceList";

type ServiceCategoryPageProps = {
  category: ServiceCategory;
};

export function ServiceCategoryPage({ category }: ServiceCategoryPageProps) {
  return (
    <main className="bg-background min-h-screen">
      <ServiceCategoryHero category={category} />
      <ServiceList category={category} />
      <ServiceCategoryCTA />
    </main>
  );
}
