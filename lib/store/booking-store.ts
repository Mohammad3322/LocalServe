import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CustomerDetails } from "@/lib/validation/booking.schema";

type BookingState = {
  providerId?: string;
  serviceId?: string;
  date?: string;
  time?: string;
  hasHydrated: boolean;

  customer?: CustomerDetails;

  setAppointment: (data: {
    providerId: string;
    serviceId: string;
    date: string;
    time: string;
  }) => void;

  setHasHydrated: (value: boolean) => void;

  setCustomer: (customer: CustomerDetails) => void;

  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      providerId: undefined,
      serviceId: undefined,
      date: undefined,
      time: undefined,
      customer: undefined,
      hasHydrated: false,

      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),

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

      clearBooking: () =>
        set({
          providerId: undefined,
          serviceId: undefined,
          date: undefined,
          time: undefined,
          customer: undefined,
        }),
    }),
    {
      name: "localserve:booking-draft",
      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") {
            return null;
          }

          const value = sessionStorage.getItem(name);

          return value ? JSON.parse(value) : null;
        },

        setItem: (name, value) => {
          if (typeof window === "undefined") {
            return;
          }

          sessionStorage.setItem(name, JSON.stringify(value));
        },

        removeItem: (name) => {
          if (typeof window === "undefined") {
            return;
          }

          sessionStorage.removeItem(name);
        },
      },

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
