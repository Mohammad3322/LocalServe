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
  console.log("1. Booking input:", input);

  const validatedInput = createBookingSchema.parse(input);

  console.log("2. Validated input:", validatedInput);

  const response = await apiClient.post("/bookings", validatedInput);

  console.log("3. API response:", response.status, response.data);

  const booking = bookingResponseSchema.parse(response.data);

  console.log("4. Validated booking:", booking);

  return booking;
}
