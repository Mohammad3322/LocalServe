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
  id: "pro-3",
  slug: "pro-3",
  name: "Amelia Bernard",
  headline: "Networks, cabling and smart home technology",
  imageUrl: "/images/providers/solar-tech-pro.jpg",
  serviceArea: "Lyon & nearby areas",
  rating: 4.8,
  reviewCount: 9,
  verified: true,
  startingPrice: 870,
  available: true,
  description:
    "Amelia Bernard is a heating, cooling & renewable energy specialist based in Lyon, serving residential and small business customers for over 16 years. Every job is quoted before work starts and covered by a workmanship guarantee.",
  experienceYears: 16,
  credentials: [],
  languages: ["English"],
  servicesIds: ["solar-panel-installation-pro-3-2"],
};

const withAppointment = () =>
  useBookingStore.setState({
    providerId: "pro-3",
    serviceId: "solar-panel-installation-pro-3-2",
    date: "2026-10-20",
    time: "09:30",
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
      expect(push).toHaveBeenCalledWith("/book/pro-3/review"),
    );
    expect(useBookingStore.getState().customer).toMatchObject({
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
    });
  });
});
