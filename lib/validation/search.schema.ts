import { z } from "zod";

export const searchParamsSchema = z.object({
  service: z.string().trim().optional(),

  location: z.string().trim().optional(),

  rating: z.coerce
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),

  availability: z
    .enum(["true", "false"])
    .optional(),

  sort: z
    .enum(["rating", "price-low", "price-high", "availability"])
    .optional(),

  page: z.coerce.number().int().positive().default(1),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;