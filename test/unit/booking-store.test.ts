import { useBookingStore } from "@/lib/store/booking-store";

const STORAGE_KEY = "localserve:booking-draft";

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
  sessionStorage.clear();
  localStorage.clear();
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
  });
});

describe("draft persistence", () => {
  it("keeps the draft in sessionStorage so it is dropped when the tab closes", () => {
    useBookingStore.getState().setAppointment(appointment);

    expect(sessionStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it("never writes the customer draft to localStorage", () => {
    useBookingStore.getState().setCustomer(customer);

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(localStorage.length).toBe(0);
  });

  it("stores the appointment under a namespaced key", () => {
    useBookingStore.getState().setAppointment(appointment);

    const raw = sessionStorage.getItem(STORAGE_KEY);

    expect(JSON.parse(raw ?? "{}").state).toMatchObject(appointment);
  });

  it("restores a draft that was saved earlier in the session", async () => {
    useBookingStore.getState().setAppointment(appointment);
    useBookingStore.getState().setCustomer(customer);

    jest.resetModules();
    const { useBookingStore: rehydrated } =
      await import("@/lib/store/booking-store");

    expect(rehydrated.getState()).toMatchObject({
      ...appointment,
      customer,
    });
  });

  it("starts empty when the saved draft is malformed", async () => {
    sessionStorage.setItem(STORAGE_KEY, "{not valid json");

    jest.resetModules();
    const { useBookingStore: rehydrated } =
      await import("@/lib/store/booking-store");

    expect(rehydrated.getState().customer).toBeUndefined();
  });
});
