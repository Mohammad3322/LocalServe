import { apiClient } from "./client";
import {
  providerSchema,
  providersSchema,
  type Provider,
} from "@/lib/validation/provider.schema";

export async function getProviders(): Promise<Provider[]> {
  const response = await apiClient.get("/services");
  return providersSchema.parse(response.data);
}

export async function getProviderBySlug(slug: string): Promise<Provider> {
  const response = await apiClient.get(`/providers/${slug}`);
  return providerSchema.parse(response.data);
}
