import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchFilters } from "@/components/search/SearchFilters";

const push = jest.fn();
let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const renderWithSearch = (search: string) => {
  currentSearch = search;
  return render(<SearchFilters />);
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

    expect(
      screen.getByRole("heading", { name: "Filters" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear all/i }),
    ).toBeInTheDocument();
  });

  it("labels the category and minimum rating controls", () => {
    renderWithSearch("");

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Minimum Rating")).toBeInTheDocument();
  });

  it("exposes the availability filter as a checkbox", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("checkbox", { name: /available/i }),
    ).toBeInTheDocument();
  });

  it("shows the placeholder when no category is selected", () => {
    renderWithSearch("");

    expect(
      screen.getByRole("button", { name: /all services/i }),
    ).toBeInTheDocument();
  });

  it("reflects the category that is already in the URL", () => {
    renderWithSearch("category=solar-energy");

    expect(
      screen.getByRole("button", { name: /solar energy/i }),
    ).toBeInTheDocument();
  });

  it("reflects the minimum rating that is already in the URL", () => {
    renderWithSearch("rating=4");

    expect(
      screen.getByRole("button", { name: /4\+ stars/i }),
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

  it("removes every filter when Clear all is used", async () => {
    const user = userEvent.setup();
    renderWithSearch(
      "category=solar-energy&rating=4&availability=true&page=2&service=Solar",
    );

    await user.click(screen.getByRole("button", { name: /clear all/i }));

    const { params } = pushedQuery();

    expect(params.get("category")).toBeNull();
    expect(params.get("rating")).toBeNull();
    expect(params.get("availability")).toBeNull();
  });

  it("keeps the search criteria when Clear all is used", async () => {
    const user = userEvent.setup();
    renderWithSearch("service=Solar&location=Paris&category=solar-energy");

    await user.click(screen.getByRole("button", { name: /clear all/i }));

    const { params } = pushedQuery();

    expect(params.get("service")).toBe("Solar");
    expect(params.get("location")).toBe("Paris");
    expect(params.get("page")).toBe("1");
  });
});
