import { z } from "zod";

export const reviewShema = z.object({
  providerSlug: z.string(),
  customerId: z.string(),
  content: z.string(),
});

export type Review = z.infer<typeof reviewShema>;
