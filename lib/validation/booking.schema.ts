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

//
export const createBookingSchema = z.object({
  providerId: z.string().min(1),

  serviceId: z.string().min(1),

  date: z.string().min(1),

  time: z.string().min(1),

  customerName: z.string().trim().min(2, "Name must be at least 2 characters"),

  customerEmail: z.email("Please enter a valid email address"),

  customerPhone: z.string().trim().optional(),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

//
export const bookingResponseSchema = z.object({
  id: z.string(),

  reference: z.string(),

  providerId: z.string(),

  serviceId: z.string(),

  date: z.string(),

  time: z.string(),

  customerName: z.string(),

  customerEmail: z.string(),

  customerPhone: z.string().optional(),

  notes: z.string().optional(),

  status: z.enum(["confirmed", "pending"]),
});

export type BookingResponse = z.infer<typeof bookingResponseSchema>;
