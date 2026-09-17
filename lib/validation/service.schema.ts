import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  durationMinutes: z.number().int().positive(),
  priceCents: z.number().int().nonnegative(),
  category: z.string(),
});

export const servicesSchema = z.array(serviceSchema);

export type Service = z.infer<typeof serviceSchema>;