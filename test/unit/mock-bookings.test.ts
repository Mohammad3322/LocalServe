import {
  getBooking,
  hasBookingForSlot,
  saveBooking,
} from "@/lib/data/mock-bookings";
import type { BookingResponse } from "@/lib/validation/booking.schema";

const booking = (
  overrides: Partial<BookingResponse> = {},
): BookingResponse => ({
  id: "booking-1",
  reference: "LS-1A2B3C4D",
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date: "2026-09-28",
  time: "09:00",
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
  status: "confirmed",
  ...overrides,
});

const clearBookings = () => {
  const store = (
    globalThis as typeof globalThis & {
      __localserve_bookings__?: Map<string, BookingResponse>;
    }
  ).__localserve_bookings__;

  store?.clear();
};

beforeEach(clearBookings);

describe("saveBooking / getBooking", () => {
  it("returns undefined for a booking that was never saved", () => {
    expect(getBooking("missing-booking")).toBeUndefined();
  });

  it("stores a booking and reads it back by id", () => {
    const created = booking();

    saveBooking(created);

    expect(getBooking("booking-1")).toEqual(created);
  });

  it("replaces an existing booking with the same id", () => {
    saveBooking(booking({ status: "pending" }));
    saveBooking(booking({ status: "confirmed" }));

    expect(getBooking("booking-1")?.status).toBe("confirmed");
  });

  it("keeps bookings with different ids separate", () => {
    saveBooking(booking({ id: "booking-1" }));
    saveBooking(booking({ id: "booking-2" }));

    expect(getBooking("booking-1")?.id).toBe("booking-1");
    expect(getBooking("booking-2")?.id).toBe("booking-2");
  });
});

describe("hasBookingForSlot", () => {
  it("returns false when nothing has been booked for the slot", () => {
    expect(
      hasBookingForSlot({
        providerId: "pro-1",
        date: "2026-09-28",
        time: "09:00",
      }),
    ).toBe(false);
  });

  it("returns true once the same provider, date and time is booked", () => {
    saveBooking(booking());

    expect(
      hasBookingForSlot({
        providerId: "pro-1",
        date: "2026-09-28",
        time: "09:00",
      }),
    ).toBe(true);
  });

  it("treats a different time on the same day as still free", () => {
    saveBooking(booking());

    expect(
      hasBookingForSlot({
        providerId: "pro-1",
        date: "2026-09-28",
        time: "10:00",
      }),
    ).toBe(false);
  });

  it("treats the same time for a different provider as still free", () => {
    saveBooking(booking());

    expect(
      hasBookingForSlot({
        providerId: "pro-2",
        date: "2026-09-28",
        time: "09:00",
      }),
    ).toBe(false);
  });

  it("treats the same provider and time on a different day as still free", () => {
    saveBooking(booking());

    expect(
      hasBookingForSlot({
        providerId: "pro-1",
        date: "2026-09-29",
        time: "09:00",
      }),
    ).toBe(false);
  });
});
