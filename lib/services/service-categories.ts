import type { Service } from "@/lib/validation/service.schema";
import { services } from "@/lib/data/seed/generate";
import { serviceCategories } from "../data/seed/categories";

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  services: Service[];
};

export function getServiceCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  const category = serviceCategories.find((item) => item.slug === slug);

  if (!category) {
    return undefined;
  }

  return {
    ...category,
    services: services.filter((service) => service.category === category.slug),
  };
}
