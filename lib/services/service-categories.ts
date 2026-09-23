import type { Service } from "@/lib/validation/service.schema";
import { services } from "@/lib/data/seed/services";

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  services: Service[];
};

export const serviceCategories = [
  {
    slug: "solar-energy",
    title: "Solar Energy",
    description: "Professional solar energy services for homes and businesses.",
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    description:
      "Reliable security and surveillance solutions from local professionals.",
  },
  {
    slug: "electronic-services",
    title: "Electronic Services",
    description: "Professional electronic and smart technology services.",
  },
];

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
