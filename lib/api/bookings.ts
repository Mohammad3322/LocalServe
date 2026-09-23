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
  console.log("INPUT:", input);

  const validatedInput = createBookingSchema.parse(input);

  console.log("VALIDATED INPUT:", validatedInput);

  const response = await apiClient.post("/bookings", validatedInput);

  console.log("RESPONSE STATUS:", response.status);
  console.log("RESPONSE DATA:", response.data);
  console.log("RESPONSE URL:", response.config.url);

  const booking = bookingResponseSchema.parse(response.data);

  console.log("VALIDATED BOOKING:", booking);

  return booking;
}
