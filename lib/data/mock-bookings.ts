import type { BookingResponse } from "@/lib/validation/booking.schema";

const bookings = new Map<string, BookingResponse>();

export function saveBooking(booking: BookingResponse) {
  bookings.set(booking.id, booking);
}

export function getBooking(bookingId: string): BookingResponse | undefined {
  return bookings.get(bookingId);
}
