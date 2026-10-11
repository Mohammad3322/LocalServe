import { z } from "zod";

import { serviceCategories } from "@/lib/data/seed/categories";

const categoryIds = serviceCategories.map((c) => c.id) as [string, ...string[]];

export const searchParamsSchema = z
  .object({
    service: z.string().trim().toLowerCase().optional().catch(undefined),

    location: z.string().trim().toLowerCase().optional().catch(undefined),

    category: z.enum(categoryIds).optional().catch(undefined),

    rating: z.coerce.number().int().min(1).max(5).optional().catch(undefined),

    price: z
      .string()
      .regex(/^\d+-\d+$/, "Price must be in format 'min-max'")
      .transform((val) => {
        const [min, max] = val.split("-").map(Number);
        return { min, max };
      })
      .refine((range) => range.min <= range.max, {
        message: "min must be less than or equal to max",
      })
      .optional()
      .catch(undefined),

    availability: z.enum(["true", "false"]).optional().catch(undefined),

    sort: z
      .enum(["rating", "price-low", "price-high", "availability"])
      .default("rating")
      .catch("rating"),

    page: z.coerce.number().int().positive().default(1).catch(1),
  })
  .strip(); // delete unknown fields in (params)

export type SearchParams = z.infer<typeof searchParamsSchema>;

export type PriceRange = NonNullable<SearchParams["price"]>;
