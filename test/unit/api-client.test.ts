const create = jest.fn((config: Record<string, unknown>) => config);

jest.mock("axios", () => ({
  __esModule: true,
  default: { create },
}));

const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;

beforeEach(() => {
  create.mockClear();
  jest.resetModules();
});

const configFor = () => create.mock.calls[0][0];

afterAll(() => {
  if (originalApiUrl === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
  }
});

const loadClient = async () => {
  const clientModule = await import("@/lib/api/client");

  return clientModule.apiClient;
};

describe("apiClient", () => {
  it("falls back to the local API routes when no base URL is configured", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    await loadClient();

    expect(create).toHaveBeenCalledTimes(1);
    expect(configFor()).toMatchObject({ baseURL: "/api" });
  });

  it("uses NEXT_PUBLIC_API_URL when it is set", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.localserve.test";

    await loadClient();

    expect(configFor()).toMatchObject({
      baseURL: "https://api.localserve.test",
    });
  });

  it("sends and expects JSON", async () => {
    await loadClient();

    expect(configFor()).toMatchObject({
      headers: { "Content-Type": "application/json" },
    });
  });

  it("gives up on a request after 10 seconds", async () => {
    await loadClient();

    expect(configFor()).toMatchObject({ timeout: 10_000 });
  });
});
