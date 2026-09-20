import { z } from "zod";

export const customerDetailsSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters"),
  customerEmail: z.email("Please enter a valid email address"),
  customerPhone: z.string().trim().optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type CustomerDetails = z.infer<typeof customerDetailsSchema>;
