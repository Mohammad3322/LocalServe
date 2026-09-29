import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchHeader } from "@/components/search/SearchHeader";

const push = jest.fn();
let currentSearch = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const serviceInput = () => screen.getAllByRole("combobox")[0];
const locationInput = () => screen.getAllByRole("combobox")[1];

const searchButton = () => screen.getByRole("button", { name: /search/i });

const typeInto = async (
  user: ReturnType<typeof userEvent.setup>,
  input: () => HTMLElement,
  text: string,
) => {
  await user.type(input(), text);
  await user.keyboard("{Escape}");
};

const pushedQuery = () => {
  const pushed = push.mock.calls[0][0] as string;
  const query = pushed.split("?")[1]?.split("#")[0] ?? "";

  return new URLSearchParams(query);
};

beforeEach(() => {
  jest.clearAllMocks();
  currentSearch = "";
});

describe("SearchHeader", () => {
  it("submits the search while preserving filters and resetting pagination", async () => {
    const user = userEvent.setup();
    currentSearch = "page=4&sort=rating&rating=4";

    render(<SearchHeader />);
    await typeInto(user, serviceInput, "Solar");
    await typeInto(user, locationInput, "Paris");
    await user.click(searchButton());

    const params = pushedQuery();
    expect(params.get("service")).toBe("Solar");
    expect(params.get("location")).toBe("Paris");
    expect(params.get("page")).toBe("1");
    expect(params.get("sort")).toBe("rating");
    expect(params.get("rating")).toBe("4");
    expect(push).toHaveBeenCalledWith(
      expect.stringMatching(/^\/search\?.+#searchResults$/),
    );
  });

  it("gives each search field an accessible name", () => {
    render(<SearchHeader />);

    const [serviceBox, locationBox] = screen.getAllByRole("combobox");

    expect(serviceBox).toHaveAccessibleName("What service do you need?");
    expect(locationBox).toHaveAccessibleName("Where do you need it?");
  });
});
