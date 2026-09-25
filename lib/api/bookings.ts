import { apiClient } from "./client";

import {
  bookingResponseSchema,
  createBookingSchema,
  type BookingResponse,
  type CreateBookingInput,
} from "@/lib/validation/booking.schema";

export async function createBooking(
  input: CreateBookingInput,
): Promise<BookingResponse> {
  const validatedInput = createBookingSchema.parse(input);

  const response = await apiClient.post("/bookings", validatedInput);

  return bookingResponseSchema.parse(response.data);
}

export async function getBookingById(
  bookingId: string,
): Promise<BookingResponse> {
  const response = await apiClient.get(`/bookings/${bookingId}`);

  return bookingResponseSchema.parse(response.data);
}
