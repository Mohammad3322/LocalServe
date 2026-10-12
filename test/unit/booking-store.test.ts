import { useBookingStore } from "@/lib/store/booking-store";

const appointment = {
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date: "2026-09-28",
  time: "09:00",
};

const customer = {
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
};

beforeEach(() => {
  useBookingStore.getState().clearBooking();
});

describe("useBookingStore", () => {
  it("starts with nothing selected", () => {
    const state = useBookingStore.getState();

    expect(state.providerId).toBeUndefined();
    expect(state.serviceId).toBeUndefined();
    expect(state.date).toBeUndefined();
    expect(state.time).toBeUndefined();
    expect(state.customer).toBeUndefined();
    expect(state.confirmedBooking).toBeUndefined();
  });

  it("keeps the appointment so later steps can read it", () => {
    useBookingStore.getState().setAppointment(appointment);

    expect(useBookingStore.getState()).toMatchObject(appointment);
  });

  it("keeps the customer details separately from the appointment", () => {
    useBookingStore.getState().setAppointment(appointment);
    useBookingStore.getState().setCustomer(customer);

    const state = useBookingStore.getState();

    expect(state.customer).toEqual(customer);
    expect(state).toMatchObject(appointment);
  });

  it("replaces the appointment when a different slot is chosen", () => {
    useBookingStore.getState().setAppointment(appointment);
    useBookingStore
      .getState()
      .setAppointment({ ...appointment, date: "2026-09-29", time: "14:00" });

    expect(useBookingStore.getState()).toMatchObject({
      date: "2026-09-29",
      time: "14:00",
    });
  });

  it("clears both the appointment and the customer details", () => {
    useBookingStore.getState().setAppointment(appointment);
    useBookingStore.getState().setCustomer(customer);

    useBookingStore.getState().clearBooking();

    const state = useBookingStore.getState();

    expect(state.providerId).toBeUndefined();
    expect(state.serviceId).toBeUndefined();
    expect(state.date).toBeUndefined();
    expect(state.time).toBeUndefined();
    expect(state.customer).toBeUndefined();
    expect(state.confirmedBooking).toBeUndefined();
  });

  it("stores the confirmed booking after createBooking succeeds", () => {
    const confirmedBooking = {
      id: "booking-1",
      reference: "LS-ABC12345",
      providerId: "pro-1",
      serviceId: "solar-panel-installation",
      date: "2026-09-28",
      time: "09:00",
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      status: "confirmed" as const,
    };

    useBookingStore.getState().setConfirmedBooking(confirmedBooking);

    expect(useBookingStore.getState().confirmedBooking).toEqual(
      confirmedBooking,
    );
  });

  it("keeps the appointment when only the confirmed booking is set", () => {
    const confirmedBooking = {
      id: "booking-1",
      reference: "LS-ABC12345",
      providerId: "pro-1",
      serviceId: "solar-panel-installation",
      date: "2026-09-28",
      time: "09:00",
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      status: "confirmed" as const,
    };

    useBookingStore.getState().setAppointment(appointment);
    useBookingStore.getState().setConfirmedBooking(confirmedBooking);

    const state = useBookingStore.getState();

    expect(state).toMatchObject(appointment);
    expect(state.confirmedBooking).toEqual(confirmedBooking);
  });

  it("clears the confirmed booking when clearing the whole booking", () => {
    const confirmedBooking = {
      id: "booking-1",
      reference: "LS-ABC12345",
      providerId: "pro-1",
      serviceId: "solar-panel-installation",
      date: "2026-09-28",
      time: "09:00",
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      status: "confirmed" as const,
    };

    useBookingStore.getState().setAppointment(appointment);
    useBookingStore.getState().setCustomer(customer);
    useBookingStore.getState().setConfirmedBooking(confirmedBooking);

    useBookingStore.getState().clearBooking();

    const state = useBookingStore.getState();

    expect(state.providerId).toBeUndefined();
    expect(state.serviceId).toBeUndefined();
    expect(state.date).toBeUndefined();
    expect(state.time).toBeUndefined();
    expect(state.customer).toBeUndefined();
    expect(state.confirmedBooking).toBeUndefined();
  });
});
