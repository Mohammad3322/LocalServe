import { render, screen } from "@testing-library/react";

import { ProviderAvailability } from "@/components/providers/ProviderAvailability";
import type { AvailabilitySlot } from "@/lib/validation/availability.schema";

const getProviderAvailability = jest.fn();

jest.mock("@/lib/services/availability", () => ({
  getProviderAvailability: (...args: unknown[]) =>
    getProviderAvailability(...args),
}));

const slot = (
  id: string,
  date: string,
  time: string,
  available = true,
): AvailabilitySlot => ({
  id,
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date,
  time,
  available,
});

const setSlots = (slots: AvailabilitySlot[]) => {
  getProviderAvailability.mockReturnValue(slots);
};

beforeEach(() => {
  jest.clearAllMocks();
  setSlots([]);
});

describe("ProviderAvailability", () => {
  it("asks for the slots of the provider it was given", () => {
    setSlots([slot("slot-1", "2026-09-28", "09:00")]);

    render(<ProviderAvailability providerId="pro-1" />);

    expect(getProviderAvailability).toHaveBeenCalledWith({
      providerId: "pro-1",
    });
  });

  describe("when slots are available", () => {
    it("shows the date and time of each available slot", () => {
      setSlots([
        slot("slot-1", "2026-09-28", "09:00"),
        slot("slot-2", "2026-09-29", "14:00"),
      ]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.getByText("Mon, Sep 28")).toBeInTheDocument();
      expect(screen.getByText("09:00")).toBeInTheDocument();
      expect(screen.getByText("Tue, Sep 29")).toBeInTheDocument();
      expect(screen.getByText("14:00")).toBeInTheDocument();
    });

    it("leaves out slots that are already taken", () => {
      setSlots([
        slot("slot-1", "2026-09-28", "09:00"),
        slot("slot-2", "2026-09-29", "14:00", false),
      ]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.getByText("09:00")).toBeInTheDocument();
      expect(screen.queryByText("14:00")).toBeNull();
    });

    it("links through to the full booking flow", () => {
      setSlots([slot("slot-1", "2026-09-28", "09:00")]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(
        screen.getByRole("link", { name: /view full availability/i }),
      ).toHaveAttribute("href", "/book/pro-1");
    });

    it("shows nothing about unavailability when there is something to book", () => {
      setSlots([slot("slot-1", "2026-09-28", "09:00")]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.queryByText("No available times")).toBeNull();
      expect(screen.queryByText("No availability right now")).toBeNull();
    });
  });

  describe("when every listed slot is taken", () => {
    it("says so", () => {
      setSlots([slot("slot-1", "2026-09-28", "09:00", false)]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.getByText("No available times")).toBeInTheDocument();
    });

    it("distinguishes a fully booked day from a provider with no schedule", () => {
      setSlots([slot("slot-1", "2026-09-28", "09:00", false)]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.queryByText("No availability right now")).toBeNull();
    });

    it("still offers a way to reach the booking page", () => {
      setSlots([slot("slot-1", "2026-09-28", "09:00", false)]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(
        screen.getByRole("link", { name: /check availability/i }),
      ).toHaveAttribute("href", "/book/pro-1");
    });
  });

  describe("when the provider has no slots at all", () => {
    it("says the provider has no availability", () => {
      setSlots([]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(screen.getByText("No availability right now")).toBeInTheDocument();
    });

    it("explains what that means instead of showing an empty grid", () => {
      setSlots([]);

      render(<ProviderAvailability providerId="pro-1" />);

      expect(
        screen.getByText(
          "There are currently no appointment times available for this professional.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("can be linked to by anchor from the profile navigation", () => {
    setSlots([slot("slot-1", "2026-09-28", "09:00")]);

    const { container } = render(<ProviderAvailability providerId="pro-1" />);

    expect(container.querySelector("#availability")).toBeInTheDocument();
  });
});
