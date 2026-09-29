import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TimeSlot } from "@/components/ui/TimeSlot";

describe("TimeSlot", () => {
  it("selects an available time", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <TimeSlot time="09:00" selected={false} available onSelect={onSelect} />,
    );
    await user.click(screen.getByRole("button", { name: "09:00" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("prevents selecting an unavailable time", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <TimeSlot
        time="09:00"
        selected={false}
        available={false}
        onSelect={onSelect}
      />,
    );

    expect(screen.getByRole("button", { name: /09:00/ })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /09:00/ }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
