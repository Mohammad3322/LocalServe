import { expect, test } from "@playwright/test";

const pickService = async (
  page: import("@playwright/test").Page,
  name: string,
) => {
  await page.locator('[data-slot="autocomplete-trigger"]').first().click();
  await page.getByRole("option", { name }).click();
};

test("a visitor can search, pick a slot and receive a confirmed booking", async ({
  page,
}) => {
  //  Search from the homepage
  await page.goto("/");

  await pickService(page, "Solar Panel Installation");

  await page.getByRole("button", { name: "Search for providers" }).click();

  await expect(page).toHaveURL(/\/search\?service=/);
  await expect(
    page.getByRole("heading", { name: "Search Results" }),
  ).toBeVisible();

  const sort = page.getByRole("button", { name: /sort search results/i });
  await sort.click();
  await page.getByRole("option", { name: "Price: Low to High" }).click();

  await expect(page).toHaveURL(/sort=price-low/);

  await page
    .getByRole("link", { name: /view profile/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/providers\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Book Service" }).first().click();

  await expect(page).toHaveURL(/\/book\/.+\?service=/);
  await expect(page.getByText("Loading available dates...")).toBeHidden({
    timeout: 30_000,
  });

  const enabledDay = page
    .locator('[role="gridcell"]:not([aria-disabled="true"])')
    .filter({ hasNot: page.locator("[data-outside-month]") })
    .first();

  await expect(enabledDay).toBeVisible();
  await enabledDay.click();

  const firstSlot = page
    .locator("button", { hasText: /^\d{2}:\d{2}$/ })
    .first();
  await expect(firstSlot).toBeVisible();
  await firstSlot.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/book\/.+\/details/);

  await page.getByLabel("Full Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Continue to Review" }).click();

  await expect(
    page.getByRole("heading", { name: /review/i }).first(),
  ).toBeVisible();

  await expect(page.getByText("Ada Lovelace")).toBeVisible();

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page).toHaveURL(/\/booking\/confirmation\//, {
    timeout: 30_000,
  });

  await expect(
    page.getByRole("heading", { name: "Your appointment is confirmed" }),
  ).toBeVisible({ timeout: 30_000 });

  await expect(page.getByText(/^LS-[0-9A-F]{8}$/)).toBeVisible();
  await expect(page.getByText("Ada Lovelace")).toBeVisible();
});
