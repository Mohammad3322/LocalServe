import { expect, test } from "@playwright/test";

type BookingTarget = { providerId: string; serviceId: string };

const BOOKED: BookingTarget = {
  providerId: "pro-4",
  serviceId: "solar-panel-installation-2",
};

const CONFLICT_A: BookingTarget = {
  providerId: "pro-2",
  serviceId: "cctv-installation",
};

const CONFLICT_B: BookingTarget = {
  providerId: "pro-5",
  serviceId: "cctv-installation-2",
};

const reachReviewStep = async (
  page: import("@playwright/test").Page,
  { providerId, serviceId }: BookingTarget,
) => {
  await page.goto(`/book/${providerId}?service=${serviceId}`);

  const enabledDay = page
    .locator('[role="gridcell"]:not([aria-disabled="true"])')
    .first();

  await expect(enabledDay).toBeVisible();
  await enabledDay.click();

  const firstSlot = page
    .locator("button", { hasText: /^\d{2}:\d{2}$/ })
    .first();

  await expect(firstSlot).toBeVisible();
  await firstSlot.click();

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/book\/.+\/details/, { timeout: 30_000 });

  await page.getByLabel("Full Name").fill("Grace Hopper");
  await page.getByLabel("Email").fill("grace@example.com");
  await page.getByRole("button", { name: "Continue to Review" }).click();

  await expect(page).toHaveURL(/\/book\/.+\/review/, { timeout: 30_000 });
};

test("a slot taken while the user is on the review step is explained and recoverable", async ({
  page,
}) => {
  let attempts = 0;

  await page.route("**/api/bookings", async (route) => {
    if (route.request().method() !== "POST") {
      return route.fallback();
    }

    attempts += 1;

    if (attempts === 1) {
      return route.fulfill({
        status: 409,
        contentType: "application/json",
        body: JSON.stringify({
          message: "This time slot is no longer available.",
          code: "SLOT_UNAVAILABLE",
        }),
      });
    }

    return route.fallback();
  });

  await reachReviewStep(page, BOOKED);

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(
    page.getByText("This time slot is no longer available"),
  ).toBeVisible();

  await expect(
    page.getByText(/someone else may have booked this appointment/i),
  ).toBeVisible();

  await expect(page.getByText("Grace Hopper")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Choose Another Time" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page).toHaveURL(/\/booking\/confirmation\//, {
    timeout: 30_000,
  });

  await expect(
    page.getByRole("heading", { name: "Your appointment is confirmed" }),
  ).toBeVisible({ timeout: 30_000 });
});

test("choosing another time returns the user to the booking flow", async ({
  page,
}) => {
  await page.route("**/api/bookings", async (route) => {
    if (route.request().method() !== "POST") {
      return route.fallback();
    }

    return route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({
        message: "This time slot is no longer available.",
        code: "SLOT_UNAVAILABLE",
      }),
    });
  });

  await reachReviewStep(page, CONFLICT_A);

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(
    page.getByText("This time slot is no longer available"),
  ).toBeVisible();

  await page.getByRole("link", { name: "Choose Another Time" }).click();

  await expect(page).toHaveURL(
    `/book/${CONFLICT_A.providerId}?service=${CONFLICT_A.serviceId}`,
  );
  await expect(
    page.getByRole("navigation", { name: "Booking progress" }),
  ).toBeVisible();
});

test("choosing another time keeps the service the user already picked", async ({
  page,
}) => {
  await page.route("**/api/bookings", async (route) => {
    if (route.request().method() !== "POST") {
      return route.fallback();
    }

    return route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({
        message: "This time slot is no longer available.",
        code: "SLOT_UNAVAILABLE",
      }),
    });
  });

  await reachReviewStep(page, CONFLICT_B);

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(
    page.getByText("This time slot is no longer available"),
  ).toBeVisible();

  await page.getByRole("link", { name: "Choose Another Time" }).click();
  await expect(page).toHaveURL(
    `/book/${CONFLICT_B.providerId}?service=${CONFLICT_B.serviceId}`,
  );

  await expect(page.getByText("Choose a Date & Time")).toBeVisible({
    timeout: 30_000,
  });
  await expect(
    page.getByRole("heading", { name: "Select a service first" }),
  ).toHaveCount(0);
});
