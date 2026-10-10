import { saveBooking } from "@/lib/data/mock-bookings";
import { availability } from "@/lib/data/seed/generate";
import { getProviderAvailability } from "@/lib/services/availability";
import type { BookingResponse } from "@/lib/validation/booking.schema";

const clearBookings = () => {
  const store = (
    globalThis as typeof globalThis & {
      __localserve_bookings__?: Map<string, BookingResponse>;
    }
  ).__localserve_bookings__;

  store?.clear();
};

beforeEach(clearBookings);
afterEach(clearBookings);

describe("getProviderAvailability", () => {
  it("returns only slots for the requested provider", () => {
    const slots = getProviderAvailability({ providerId: "pro-1" });

    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((slot) => slot.providerId === "pro-1")).toBe(true);
  });

  it("filters slots to the requested date", () => {
    const target = availability.find((slot) => slot.providerId === "pro-1");

    if (!target) {
      throw new Error("Expected seeded availability for pro-1");
    }

    const slots = getProviderAvailability({
      providerId: "pro-1",
      date: target.date,
    });

    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((slot) => slot.date === target.date)).toBe(true);
  });

  it("marks a booked slot unavailable", () => {
    const target = availability.find(
      (slot) => slot.providerId === "pro-1" && slot.available,
    );

    if (!target) {
      throw new Error("Expected an available seeded slot for pro-1");
    }

    saveBooking({
      id: "booking-1",
      reference: "LS-1A2B3C4D",
      providerId: target.providerId,
      serviceId: target.serviceId,
      date: target.date,
      time: target.time,
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      status: "confirmed",
    });

    const slots = getProviderAvailability({ providerId: target.providerId });

    expect(slots.find((slot) => slot.id === target.id)?.available).toBe(false);
  });
});
