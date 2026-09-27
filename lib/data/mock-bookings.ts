import type { BookingResponse } from "@/lib/validation/booking.schema";

const BOOKINGS_STORE_KEY = "__localserve_bookings__";

type BookingsStore = Map<string, BookingResponse>;

type GlobalWithBookings = typeof globalThis & {
  [BOOKINGS_STORE_KEY]?: BookingsStore;
};

const globalStore = globalThis as GlobalWithBookings;

const bookings: BookingsStore =
  globalStore[BOOKINGS_STORE_KEY] ?? new Map<string, BookingResponse>();

globalStore[BOOKINGS_STORE_KEY] = bookings;

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
