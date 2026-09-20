import { availability } from "@/lib/data/seed/availability";
import type { AvailabilitySlot } from "@/lib/validation/availability.schema";

export function getProviderAvailability(
  providerId: string,
): AvailabilitySlot[] {
  return availability
    .filter((slot) => slot.providerId === providerId && slot.available)
    .slice(0, 4);
}
