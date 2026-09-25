import type { BookingResponse } from "@/lib/validation/booking.schema";

const bookings = new Map<string, BookingResponse>();

export function saveBooking(booking: BookingResponse) {
  bookings.set(booking.id, booking);
}

export function getBooking(bookingId: string): BookingResponse | undefined {
  return bookings.get(bookingId);
}

export function hasBookingForSlot({
  providerId,
  date,
  time,
}: {
  providerId: string;
  date: string;
  time: string;
}): boolean {
  return Array.from(bookings.values()).some(
    (booking) =>
      booking.providerId === providerId &&
      booking.date === date &&
      booking.time === time,
  );
}
