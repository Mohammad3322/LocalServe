import { apiClient } from "@/lib/api/client";
import { getAvailability } from "@/lib/api/availability";
import { createBooking, getBookingById } from "@/lib/api/bookings";
import { getProviders, getProviderBySlug } from "@/lib/api/providers";
import { getServiceBySlug, getServices } from "@/lib/api/services";
import { searchProviders } from "@/lib/api/search";

jest.mock("@/lib/api/client", () => ({
  apiClient: { get: jest.fn(), post: jest.fn() },
}));

const get = apiClient.get as jest.Mock;
const post = apiClient.post as jest.Mock;

const validProvider = {
  id: "pro-1",
  slug: "pro-1",
  name: "John Smith",
  headline: "Solar installation & energy solutions",
  imageUrl: "/images/providers/solar-tech-pro.jpg",
  rating: 4.9,
  reviewCount: 128,
  servicesIds: ["solar-panel-installation"],
  serviceArea: "Paris & nearby areas",
  verified: true,
  startingPrice: 850,
  available: true,
  description: "Professional solar energy installation and maintenance.",
  experienceYears: 8,
  credentials: [
    {
      title: "Certified Solar Installer",
      description: "Certified experience.",
    },
  ],
  languages: ["English"],
};

const validService = {
  id: "solar-panel-installation",
  slug: "solar-panel-installation",
  providerId: "pro-1",
  title: "Solar Panel Installation",
  description: "Professional solar panel installation services.",
  durationMinutes: 180,
  priceCents: 85000,
  category: "solar-energy",
};

const validSlot = {
  id: "slot-1-1",
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date: "2026-09-28",
  time: "09:00",
  available: true,
};

const validBookingResponse = {
  id: "booking-1",
  reference: "LS-1A2B3C4D",
  providerId: "pro-1",
  serviceId: "solar-panel-installation",
  date: "2026-09-28",
  time: "09:00",
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
  status: "confirmed",
};

const respondWith = (data: unknown) => get.mockResolvedValueOnce({ data });

beforeEach(() => {
  get.mockReset();
  post.mockReset();
});

describe("lib/api/providers", () => {
  it("requests the provider collection", async () => {
    respondWith([validProvider]);

    await getProviders();

    expect(get).toHaveBeenCalledWith("/providers");
  });

  it("returns the parsed providers", async () => {
    respondWith([validProvider]);

    await expect(getProviders()).resolves.toEqual([validProvider]);
  });

  it("rejects a response that breaks the provider contract", async () => {
    respondWith([{ ...validProvider, rating: "4.9" }]);

    await expect(getProviders()).rejects.toThrow();
  });

  it("requests a single provider by its public slug", async () => {
    respondWith(validProvider);

    await getProviderBySlug("john-smith");

    expect(get).toHaveBeenCalledWith("/providers/john-smith");
  });

  it("rejects a single provider response that breaks the contract", async () => {
    respondWith({ ...validProvider, reviewCount: -5 });

    await expect(getProviderBySlug("john-smith")).rejects.toThrow();
  });

  it("propagates a network failure instead of returning an empty list", async () => {
    get.mockRejectedValueOnce(new Error("network down"));

    await expect(getProviders()).rejects.toThrow("network down");
  });
});

describe("lib/api/services", () => {
  it("requests the service collection", async () => {
    respondWith([validService]);

    await getServices();

    expect(get).toHaveBeenCalledWith("/services");
  });

  it("requests a single service by slug", async () => {
    respondWith(validService);

    await getServiceBySlug("solar-panel-installation");

    expect(get).toHaveBeenCalledWith("/services/solar-panel-installation");
  });

  it("rejects a service with a fractional price", async () => {
    respondWith({ ...validService, priceCents: 850.5 });

    await expect(
      getServiceBySlug("solar-panel-installation"),
    ).rejects.toThrow();
  });
});

describe("lib/api/search", () => {
  const searchResult = {
    items: [validProvider],
    total: 1,
    page: 1,
    pageSize: 12,
    totalPages: 1,
  };

  it("sends the search params to the search route", async () => {
    respondWith(searchResult);

    await searchProviders({ service: "Solar", page: 1 });

    expect(get).toHaveBeenCalledWith("/providers/search", {
      params: { service: "Solar", page: 1 },
    });
  });

  it("returns the pagination envelope together with the items", async () => {
    respondWith(searchResult);

    await expect(searchProviders({ page: 1 })).resolves.toEqual(searchResult);
  });

  it("rejects a page whose items break the provider contract", async () => {
    respondWith({ ...searchResult, items: [{ ...validProvider, id: 7 }] });

    await expect(searchProviders({ page: 1 })).rejects.toThrow();
  });

  it("accepts a page that contains no providers", async () => {
    respondWith({ ...searchResult, items: [], total: 0, totalPages: 0 });

    await expect(searchProviders({ page: 1 })).resolves.toMatchObject({
      items: [],
      total: 0,
    });
  });
});

describe("lib/api/availability", () => {
  it("asks for a provider's slots by provider id", async () => {
    respondWith([validSlot]);

    await getAvailability({ providerId: "pro-1" });

    expect(get).toHaveBeenCalledWith(
      "/availability",
      expect.objectContaining({
        params: { providerId: "pro-1", date: undefined },
      }),
    );
  });

  it("passes an optional date through as a filter", async () => {
    respondWith([validSlot]);

    await getAvailability({ providerId: "pro-1", date: "2026-09-28" });

    expect(get).toHaveBeenCalledWith(
      "/availability",
      expect.objectContaining({
        params: { providerId: "pro-1", date: "2026-09-28" },
      }),
    );
  });

  it("opts out of caching because availability is time sensitive", async () => {
    respondWith([validSlot]);

    await getAvailability({ providerId: "pro-1" });

    expect(get).toHaveBeenCalledWith(
      "/availability",
      expect.objectContaining({
        headers: { "Cache-Control": "no-cache" },
      }),
    );
  });

  it("returns the parsed slots", async () => {
    respondWith([validSlot]);

    await expect(getAvailability({ providerId: "pro-1" })).resolves.toEqual([
      validSlot,
    ]);
  });

  it("rejects a slot whose available flag is not a boolean", async () => {
    respondWith([{ ...validSlot, available: "yes" }]);

    await expect(getAvailability({ providerId: "pro-1" })).rejects.toThrow();
  });

  it("propagates a failure so the UI can show its error state", async () => {
    get.mockRejectedValueOnce(new Error("availability endpoint failed"));

    await expect(getAvailability({ providerId: "pro-1" })).rejects.toThrow(
      "availability endpoint failed",
    );
  });
});

describe("lib/api/bookings", () => {
  const validCreateInput = {
    providerId: "pro-1",
    serviceId: "solar-panel-installation",
    date: "2026-09-28",
    time: "09:00",
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
  };

  it("posts a booking to the bookings route", async () => {
    post.mockResolvedValueOnce({ data: validBookingResponse });

    await createBooking(validCreateInput);

    expect(post).toHaveBeenCalledWith("/bookings", validCreateInput);
  });

  it("validates the input before sending anything", async () => {
    await expect(
      createBooking({ ...validCreateInput, customerEmail: "not-an-email" }),
    ).rejects.toThrow();

    expect(post).not.toHaveBeenCalled();
  });

  it("returns the parsed confirmation result", async () => {
    post.mockResolvedValueOnce({ data: validBookingResponse });

    await expect(createBooking(validCreateInput)).resolves.toEqual(
      validBookingResponse,
    );
  });

  it("rejects a confirmation result with no booking reference", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { reference, ...withoutReference } = validBookingResponse;
    post.mockResolvedValueOnce({ data: withoutReference });
    await expect(createBooking(validCreateInput)).rejects.toThrow();
  });

  it("requests a booking by id for the confirmation page", async () => {
    get.mockResolvedValueOnce({ data: validBookingResponse });

    await getBookingById("booking-1");

    expect(get).toHaveBeenCalledWith("/bookings/booking-1");
  });

  it("rejects a confirmation lookup for an unknown booking", async () => {
    get.mockResolvedValueOnce({ data: { message: "Not found" } });

    await expect(getBookingById("nope")).rejects.toThrow();
  });
});
