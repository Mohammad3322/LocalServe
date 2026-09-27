import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceCategoryPage } from "@/components/services/ServiceCategoryPage";
import { getServiceCategoryBySlug } from "@/lib/services/service-categories";
import { buildMetadata, clampDescription } from "@/lib/seo";

type ServiceCategoryRouteProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

/**
 * The category description is the source of the page copy, so the metadata
 * description cannot drift away from what the page actually says.
 */
export async function generateMetadata({
  params,
}: ServiceCategoryRouteProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const category = getServiceCategoryBySlug(serviceSlug);

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
  const { serviceSlug } = await params;

  const category = getServiceCategoryBySlug(serviceSlug);

  if (!category) {
    notFound();
  }

  return <ServiceCategoryPage category={category} />;
}
