import { create } from "zustand";

import type {
  BookingResponse,
  CustomerDetails,
} from "@/lib/validation/booking.schema";
import { createJSONStorage, persist } from "zustand/middleware";

type BookingState = {
  providerId?: string;
  serviceId?: string;
  date?: string;
  time?: string;

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerNotes?: string;

  customer?: CustomerDetails;

  confirmedBooking?: BookingResponse;

  setAppointment: (data: {
    providerId: string;
    serviceId: string;
    date: string;
    time: string;
  }) => void;

  setCustomerName: (customerName: string) => void;
  setCustomerEmail: (customerEmail: string) => void;
  setCustomerPhone: (customerPhone: string) => void;
  setCustomerNotes: (customerNotes: string) => void;

  setCustomer: (customer: CustomerDetails) => void;

  setConfirmedBooking: (booking: BookingResponse) => void;

  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>()(
  persist<BookingState>(
    (set) => ({
      providerId: undefined,
      serviceId: undefined,
      date: undefined,
      time: undefined,

      customerName: undefined,
      customerEmail: undefined,
      customerPhone: undefined,
      customerNotes: undefined,

      customer: undefined,

      confirmedBooking: undefined,

      setAppointment: (data) =>
        set({
          providerId: data.providerId,
          serviceId: data.serviceId,
          date: data.date,
          time: data.time,
        }),

      setCustomerName: (customerName) =>
        set({
          customerName,
        }),

      setCustomerEmail: (customerEmail) =>
        set({
          customerEmail,
        }),

      setCustomerPhone: (customerPhone) =>
        set({
          customerPhone,
        }),
      setCustomerNotes: (customerNotes) =>
        set({
          customerNotes,
        }),

      setCustomer: (customer) =>
        set({
          customer,
        }),

      setConfirmedBooking: (booking) =>
        set({
          confirmedBooking: booking,
        }),

      clearBooking: () =>
        set({
          providerId: undefined,
          serviceId: undefined,
          date: undefined,
          time: undefined,
          customerName: undefined,
          customerEmail: undefined,
          customerPhone: undefined,
          customerNotes: undefined,
          customer: undefined,
          confirmedBooking: undefined,
        }),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
