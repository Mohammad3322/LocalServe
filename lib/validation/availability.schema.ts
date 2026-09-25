import { z } from "zod";

export const availabilitySlotSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  serviceId: z.string(),

  date: z.string(),
  time: z.string(),

  available: z.boolean(),
});

export const availabilitySchema = z.array(availabilitySlotSchema);

export type AvailabilitySlot = z.infer<typeof availabilitySlotSchema>;
