import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BookingDateTime } from "@/components/booking/BookingDateTime";
import { useBookingStore } from "@/lib/store/booking-store";
import type { Provider } from "@/lib/validation/provider.schema";

const getAvailability = jest.fn();

jest.mock("@/lib/api/availability", () => ({
  getAvailability: (params: unknown) => getAvailability(params),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const provider: Provider = {
  id: "pro-3",
  slug: "pro-3",
  name: "Amelia Bernard",
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
  servicesIds: ["solar-panel-installation-pro-3-2"],
};

const calendarDay = (day: number) => {
  const cell = Array.from(
    document.querySelectorAll<HTMLElement>('[data-slot="calendar-cell"]'),
  ).find((element) => element.textContent?.trim() === String(day));

  if (!cell) {
    throw new Error(`No calendar cell found for day ${day}`);
  }

  return cell;
};

const renderStep = async () => {
  render(
    <BookingDateTime
      provider={provider}
      selectedServiceId="solar-panel-installation-pro-3-2"
    />,
  );

  await waitFor(() =>
    expect(
      screen.queryByText("Loading available dates..."),
    ).not.toBeInTheDocument(),
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  useBookingStore.getState().clearBooking();
  getAvailability.mockResolvedValue([
    {
      id: "slot-1",
      providerId: "pro-3",
      serviceId: "solar-panel-installation",
      date: "2026-10-20",
      time: "14:00",
      available: true,
    },
  ]);
});

describe("BookingDateTime", () => {
  it("shows available times after a date is selected", async () => {
    const user = userEvent.setup();
    await renderStep();

    const day = calendarDay(20);
    await user.click(day);

    expect(
      screen.getByRole("heading", { name: "Available Times" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "14:00" })).toBeInTheDocument();
  });

  it("shows a recoverable message when availability cannot be loaded", async () => {
    getAvailability.mockRejectedValue(new Error("network down"));
    await renderStep();

    expect(screen.getByText("Availability unavailable")).toBeInTheDocument();
  });
});
