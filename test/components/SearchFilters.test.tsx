import Filters from "@/components/search/Filters";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = jest.fn();
let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const renderWithSearch = (search: string) => {
  currentSearch = search;
  return render(<Filters />);
};

const pushedQuery = () => {
  const [path, query = ""] = push.mock.calls.at(-1)![0].split("?");

  return { path, params: new URLSearchParams(query) };
};

beforeEach(() => {
  push.mockClear();
  currentSearch = "";
});

describe("SearchFilters", () => {
  it("renders the filter panel", () => {
    renderWithSearch("");

    expect(screen.getByText("Choose Service")).toBeInTheDocument();
    expect(screen.getByText("Where do you need it?")).toBeInTheDocument();
    expect(screen.getByText("Price range")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("shows the placeholder until a service or location is picked", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("button", { name: "Service Choose Service" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Location Where do you need it?",
      }),
    ).toBeInTheDocument();
  });

  it("reflects the service and location that are already in the URL", () => {
    renderWithSearch("service=solar-panel-installation&location=Paris");

    expect(
      screen.getByRole("button", {
        name: "Solar Panel Installation Choose Service",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Paris Where do you need it?" }),
    ).toBeInTheDocument();
  });

  it("limits the service choices to the category in the URL", () => {
    renderWithSearch("category=solar-energy");

    const [serviceChoices] = screen.getAllByTestId(
      "hidden-select-container",
    );

    expect(
      within(serviceChoices).getByText("Solar Panel Installation"),
    ).toBeInTheDocument();
    expect(
      within(serviceChoices).queryByText("CCTV Installation"),
    ).not.toBeInTheDocument();
  });

  it("shows the default price range when the URL has no price", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("button", { name: "$0 - $2000" }),
    ).toBeInTheDocument();
  });

  it("shows the price range that is already in the URL", () => {
    renderWithSearch("price=100-500");

    expect(
      screen.getByRole("button", { name: "$100 - $500" }),
    ).toBeInTheDocument();
  });

  it("exposes the availability filter as a checkbox", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("checkbox", { name: /available/i }),
    ).toBeInTheDocument();
  });

  it("ticks the availability checkbox when it is active in the URL", () => {
    renderWithSearch("availability=true");

    expect(screen.getByRole("checkbox", { name: /available/i })).toBeChecked();
  });

  it("leaves the availability checkbox unticked by default", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("checkbox", { name: /available/i }),
    ).not.toBeChecked();
  });

  it("writes the selected availability filter into the URL", async () => {
    const user = userEvent.setup();
    renderWithSearch("");

    await user.click(screen.getByRole("checkbox", { name: /available/i }));

    expect(push).toHaveBeenCalledTimes(1);
    expect(pushedQuery().params.get("availability")).toBe("true");
  });

  it("resets pagination to page 1 when a filter changes", async () => {
    const user = userEvent.setup();
    renderWithSearch("page=3");

    await user.click(screen.getByRole("checkbox", { name: /available/i }));

    expect(pushedQuery().params.get("page")).toBe("1");
  });

  it("keeps the existing search criteria when a filter changes", async () => {
    const user = userEvent.setup();
    renderWithSearch("service=Solar&location=Paris");

    await user.click(screen.getByRole("checkbox", { name: /available/i }));

    const { params } = pushedQuery();

    expect(params.get("service")).toBe("Solar");
    expect(params.get("location")).toBe("Paris");
  });

  it("navigates to the search route so the URL stays shareable", async () => {
    const user = userEvent.setup();
    renderWithSearch("");

    await user.click(screen.getByRole("checkbox", { name: /available/i }));

    expect(pushedQuery().path).toBe("/search");
  });

  it("removes service, location, price and availability when Clear is used", async () => {
    const user = userEvent.setup();
    renderWithSearch(
      "service=solar-panel-installation&location=Paris&price=100-500&availability=true&category=solar-energy",
    );

    await user.click(screen.getByText("Clear"));

    const { params } = pushedQuery();

    expect(params.get("service")).toBeNull();
    expect(params.get("location")).toBeNull();
    expect(params.get("price")).toBeNull();
    expect(params.get("availability")).toBeNull();
  });

  it("keeps the category and resets pagination when Clear is used", async () => {
    const user = userEvent.setup();
    renderWithSearch("category=solar-energy&page=2&availability=true");

    await user.click(screen.getByText("Clear"));

    const { params } = pushedQuery();

    expect(params.get("category")).toBe("solar-energy");
    expect(params.get("page")).toBe("1");
  });
});
