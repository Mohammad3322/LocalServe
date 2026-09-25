import { apiClient } from "./client";

import {
  availabilitySchema,
  type AvailabilitySlot,
} from "@/lib/validation/availability.schema";

type GetAvailabilityParams = {
  providerId: string;
  date?: string;
};

export async function getAvailability({
  providerId,
  date,
}: GetAvailabilityParams): Promise<AvailabilitySlot[]> {
  const response = await apiClient.get("/availability", {
    params: {
      providerId,
      date,
    },
  });

  return availabilitySchema.parse(response.data);
}
