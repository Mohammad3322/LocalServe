import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchHeader } from "@/components/search/SearchHeader";

const push = jest.fn();
let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const pushedUrl = () => push.mock.calls.at(-1)![0] as string;

const pushedPath = () => pushedUrl().split("?")[0];

const pushedQuery = () => {
  const query = pushedUrl().split("?")[1]?.split("#")[0] ?? "";

  return new URLSearchParams(query);
};

beforeEach(() => {
  jest.clearAllMocks();
  currentSearch = "";
});

describe("SearchHeader", () => {
  it("offers every category alongside All", () => {
    render(<SearchHeader />);

    expect(
      screen.getByRole("heading", { name: "All" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Solar Energy" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Security & Surveillance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Electronic Services" }),
    ).toBeInTheDocument();
  });

  it("selects a category, drops the service filter and keeps the other criteria", async () => {
    const user = userEvent.setup();
    currentSearch = "location=Paris&service=cctv-installation&page=3";

    render(<SearchHeader />);
    await user.click(screen.getByRole("heading", { name: "Solar Energy" }));

    expect(push).toHaveBeenCalledTimes(1);
    expect(pushedPath()).toBe("/search");

    const params = pushedQuery();

    expect(params.get("category")).toBe("solar-energy");
    expect(params.get("service")).toBeNull();
    expect(params.get("location")).toBe("Paris");
  });

  it("removes the category when All is selected", async () => {
    const user = userEvent.setup();
    currentSearch = "category=solar-energy&location=Paris";

    render(<SearchHeader />);
    await user.click(screen.getByRole("heading", { name: "All" }));

    expect(pushedPath()).toBe("/search");

    const params = pushedQuery();

    expect(params.get("category")).toBeNull();
    expect(params.get("location")).toBe("Paris");
  });

  it("highlights the category that is already in the URL", () => {
    currentSearch = "category=security-surveillance";

    render(<SearchHeader />);

    expect(
      screen.getByRole("heading", { name: "Security & Surveillance" })
        .parentElement,
    ).toHaveClass("bg-brand-500");
    expect(
      screen.getByRole("heading", { name: "Solar Energy" }).parentElement,
    ).not.toHaveClass("bg-brand-500");
  });
});
