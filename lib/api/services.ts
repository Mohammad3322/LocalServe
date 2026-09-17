import { apiClient } from "./client";
import {
  serviceSchema,
  servicesSchema,
  type Service,
} from "@/lib/validation/service.schema";

export async function getServices(): Promise<Service[]> {
  const response = await apiClient.get("/services");

  return servicesSchema.parse(response.data);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service> {
  const response = await apiClient.get(`/services/${slug}`);

  return serviceSchema.parse(response.data);
}