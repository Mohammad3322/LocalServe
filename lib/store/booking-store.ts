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

  customer?: CustomerDetails;

  confirmedBooking?: BookingResponse;

  setAppointment: (data: {
    providerId: string;
    serviceId: string;
    date: string;
    time: string;
  }) => void;

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
      customer: undefined,
      confirmedBooking: undefined,

      setAppointment: (data) =>
        set({
          providerId: data.providerId,
          serviceId: data.serviceId,
          date: data.date,
          time: data.time,
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
