import { NextResponse } from "next/server";

import { getProviderAvailability } from "@/lib/services/availability";
import { availabilitySchema } from "@/lib/validation/availability.schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const providerId = searchParams.get("providerId");
    const date = searchParams.get("date") ?? undefined;
    const serviceId = searchParams.get("serviceId") ?? undefined;

    if (!providerId) {
      return NextResponse.json(
        { message: "providerId is required." },
        { status: 400 },
      );
    }

    const slots = getProviderAvailability({
      providerId,
      date,
      serviceId,
    });

    const validatedSlots = availabilitySchema.parse(slots);

    return NextResponse.json(validatedSlots, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching availability.",
      },
      { status: 500 },
    );
  }
}
