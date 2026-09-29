import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  timeout: 90_000,

  retries: process.env.CI ? 1 : 0,

  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  expect: { timeout: 20_000 },

  use: {
    baseURL: "http://localhost:3000",

    ignoreHTTPSErrors: true,

    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev -- --port 3000",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
