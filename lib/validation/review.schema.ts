import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  customerName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.string(),
});

export const reviewsSchema = z.array(reviewSchema);

export type Review = z.infer<typeof reviewSchema>;
