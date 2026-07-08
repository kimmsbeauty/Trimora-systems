// playwright.config.js
//
// Smoke-test config, not a full e2e suite. Runs against a real production
// build (`next build && next start`), not the dev server, so these tests
// catch the same class of issue as a manual `npm run build` + click-through
// -- broken routes, missing content, actual rendering failures -- rather
// than dev-only quirks.
//
// NOTE (2026-07-08): written and lint-checked in an environment without a
// real browser available (network-restricted sandbox, confirmed earlier
// this session when `playwright install chromium` failed downloading from
// a blocked CDN) -- these tests have NOT been run successfully by the
// author before this commit. The first real proof they pass is whatever
// CI run happens after this is pushed. Treat a red CI run here as a real
// signal, not a config fluke, until proven otherwise.
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
