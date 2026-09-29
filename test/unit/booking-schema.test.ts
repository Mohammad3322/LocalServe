import {
  createBookingSchema,
  customerDetailsSchema,
} from "@/lib/validation/booking.schema";

const validCustomer = {
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
};

const validBooking = {
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date: "2026-09-28",
  time: "09:00",
  ...validCustomer,
};

describe("booking validation", () => {
  it("accepts valid customer details", () => {
    expect(customerDetailsSchema.safeParse(validCustomer).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(
      customerDetailsSchema.safeParse({
        ...validCustomer,
        customerEmail: "not-an-email",
      }).success,
    ).toBe(false);
  });

  it("requires an appointment time when creating a booking", () => {
    expect(
      createBookingSchema.safeParse({ ...validBooking, time: undefined })
        .success,
    ).toBe(false);
  });
});
