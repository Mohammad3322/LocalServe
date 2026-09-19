import { apiClient } from "./client";

import {
  providersSchema,
  type Provider,
} from "@/lib/validation/provider.schema";

import type { SearchParams } from "@/lib/validation/search.schema";

export async function searchProviders(
  params: SearchParams,
): Promise<Provider[]> {
  const response = await apiClient.get("/providers/search", {
    params,
  });

  return providersSchema.parse(response.data);
}