import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BookingDetails } from "@/components/booking/BookingDetails";
import { useBookingStore } from "@/lib/store/booking-store";
import type { Provider } from "@/lib/validation/provider.schema";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const provider: Provider = {
  id: "pro-1",
  slug: "pro-1",
  name: "John Smith",
  headline: "Solar installation & energy solutions",
  imageUrl: "/images/providers/solar-tech-pro.jpg",
  serviceArea: "Paris & nearby areas",
  rating: 4.9,
  reviewCount: 128,
  verified: true,
  startingPrice: 850,
  available: true,
  description:
    "Professional solar energy installation and maintenance services.",
  experienceYears: 8,
  credentials: [],
  languages: ["English"],
  servicesIds: ["solar-panel-installation"],
};

const withAppointment = () =>
  useBookingStore.setState({
    providerId: "pro-1",
    serviceId: "solar-panel-installation",
    date: "2026-09-28",
    time: "09:00",
    customer: undefined,
    hasHydrated: true,
  });

beforeEach(() => {
  push.mockClear();
  useBookingStore.getState().clearBooking();
  sessionStorage.clear();
});

describe("BookingDetails", () => {
  it("blocks submission when required customer details are missing", async () => {
    const user = userEvent.setup();
    withAppointment();
    render(<BookingDetails provider={provider} />);

    await user.click(
      screen.getByRole("button", { name: /continue to review/i }),
    );

    expect(
      await screen.findByText("Name must be at least 2 characters"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address"),
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("saves valid customer details and continues to review", async () => {
    const user = userEvent.setup();
    withAppointment();
    render(<BookingDetails provider={provider} />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.click(
      screen.getByRole("button", { name: /continue to review/i }),
    );

    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/book/pro-1/review"),
    );
    expect(useBookingStore.getState().customer).toMatchObject({
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
    });
  });
});
