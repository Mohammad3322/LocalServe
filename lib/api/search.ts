import { apiClient } from "./client";

import {
  providersSchema,
  type Provider,
} from "@/lib/validation/provider.schema";

import type { SearchParams } from "@/lib/validation/search.schema";

export type SearchApiResult = {
  items: Provider[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function searchProviders(
  params: SearchParams,
): Promise<SearchApiResult> {
  const response = await apiClient.get("/providers/search", {
    params,
  });

  const data = response.data;

  return {
    items: providersSchema.parse(data.items),
    total: data.total,
    page: data.page,
    pageSize: data.pageSize,
    totalPages: data.totalPages,
  };
}
