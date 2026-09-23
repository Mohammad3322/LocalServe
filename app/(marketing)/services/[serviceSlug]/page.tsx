import { notFound } from "next/navigation";

import { ServiceCategoryPage } from "@/components/services/ServiceCategoryPage";
import { getServiceCategoryBySlug } from "@/lib/services/service-categories";

type ServiceCategoryRouteProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

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
