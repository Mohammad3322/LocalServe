import { NextResponse } from "next/server";

import { searchProviders } from "@/lib/services/search";
import { searchParamsSchema } from "@/lib/validation/search.schema";
import { providersSchema } from "@/lib/validation/provider.schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = searchParamsSchema.parse({
      service: searchParams.get("service") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      location: searchParams.get("location") ?? undefined,
      rating: searchParams.get("rating") ?? undefined,
      availability: searchParams.get("availability") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      page: searchParams.get("page") ?? undefined,
    });

    const result = searchProviders(params);

    const validatedProviders = providersSchema.parse(result.items);

    return NextResponse.json({
      items: validatedProviders,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to search providers.",
      },
      {
        status: 400,
      },
    );
  }
}
