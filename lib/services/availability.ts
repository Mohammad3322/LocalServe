import { availability } from "@/lib/data/seed/availability";
import { hasBookingForSlot } from "@/lib/data/mock-bookings";
import type { AvailabilitySlot } from "@/lib/validation/availability.schema";

type GetAvailabilityParams = {
  providerId: string;
  date?: string;
  serviceId?: string;
};

export function getProviderAvailability({
  providerId,
  date,
  serviceId,
}: GetAvailabilityParams): AvailabilitySlot[] {
  return availability
    .filter((slot) => {
      if (slot.providerId !== providerId) {
        return false;
      }

      if (serviceId && slot.serviceId !== serviceId) {
        return false;
      }

      if (date && slot.date !== date) {
        return false;
      }

      return true;
    })

    .map((slot) => ({
      ...slot,
      available:
        slot.available &&
        !hasBookingForSlot({
          providerId: slot.providerId,
          date: slot.date,
          time: slot.time,
        }),
    }));
}
