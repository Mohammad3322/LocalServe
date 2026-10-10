import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceCategoryPage } from "@/components/services/ServiceCategoryPage";
import { getServiceCategoryBySlug } from "@/lib/services/service-categories";
import { buildMetadata, clampDescription } from "@/lib/seo";

type ServiceCategoryRouteProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServiceCategoryRouteProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getServiceCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Service not found" };
  }

  const description = clampDescription(
    `${category.description} Compare ${category.services.length} local ` +
      `professionals, check ratings and book online.`,
  );

  return buildMetadata({
    title: category.title,
    description,
    path: `/services/${category.slug}`,
  });
}

export default async function ServiceCategoryRoute({
  params,
}: ServiceCategoryRouteProps) {
  const { categorySlug } = await params;

  const category = getServiceCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <ServiceCategoryPage category={category} />;
}
