import { test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

test("find root cause of overflow on /search", async ({ page }) => {
  await page.goto("/search");
  await page.waitForLoadState("networkidle");

  const report = await page.evaluate(() => {
    const limit = document.documentElement.clientWidth;
    const all = Array.from(document.querySelectorAll<HTMLElement>("*"));

    const overflows = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.right > limit + 1;
    };

    const roots = all.filter(
      (el) =>
        overflows(el) &&
        !Array.from(el.children).some((child) => overflows(child as HTMLElement)),
    );

    return roots.slice(0, 15).map((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString() ?? "").slice(0, 70),
        w: Math.round(r.width),
        ws: s.whiteSpace,
        minWidth: s.minWidth,
        text: (el.textContent ?? "").trim().slice(0, 50),
      };
    });
  });

  console.log("ROOTS " + JSON.stringify(report, null, 1));
});
