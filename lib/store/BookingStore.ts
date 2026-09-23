import { create } from "zustand";
import { Customer } from "../validation/customer.schema";

type BookingState = {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
  clearBooking: () => set({ customer: null }),
}));
