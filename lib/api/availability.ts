import { apiClient } from "./client";
import {
  availabilitySchema,
  type AvailabilitySlot,
} from "@/lib/validation/availability.schema";

type GetAvailabilityParams = {
  providerId: string;
  date?: string;
  /** Narrows the calendar to the service the customer already chose. */
  serviceId?: string;
};

export async function getAvailability({
  providerId,
  date,
  serviceId,
}: GetAvailabilityParams): Promise<AvailabilitySlot[]> {
  const response = await apiClient.get("/availability", {
    params: {
      providerId,
      date,
      serviceId,
    },
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  return availabilitySchema.parse(response.data);
}
