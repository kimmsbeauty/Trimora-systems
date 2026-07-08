// tests/smoke.spec.js
//
// Basic smoke tests, not a full e2e suite: confirms every real page route
// loads (200, no Next.js "page could not be found" boilerplate), shows its
// expected distinguishing content, and that nav/footer render consistently.
// Plus a couple of interaction checks for the most business-critical
// features (lead form, chat widget) actually opening.
//
// See playwright.config.js's top comment: not run successfully by the
// author before this commit (no browser available in that sandbox) --
// the first real CI run is the actual proof these pass.
import { test, expect } from "@playwright/test";

// { path, heading } -- heading is a distinguishing text fragment unique
// to that page, used to confirm real content loaded, not a blank/error
// page that happened to return 200.
const PAGES = [
  { path: "/", heading: "Building the Future of Business Management" },
  { path: "/solutions", heading: "Trimora POS" },
  { path: "/beauty", heading: "Trimora Beauty" },
  { path: "/auto", heading: "Trimora Auto" },
  { path: "/about", heading: "About Trimora Systems" },
  { path: "/careers", heading: "Marketing Partner" },
  { path: "/resources", heading: "Resources" },
  { path: "/docs", heading: "Docs" },
  { path: "/blog", heading: "Blog" },
  { path: "/legal/privacy", heading: "Privacy Policy" },
  { path: "/legal/terms", heading: "Terms of Service" },
  { path: "/legal/security", heading: "Security" },
  { path: "/legal/compliance", heading: "Compliance" },
  { path: "/legal/status", heading: "System Status" },
];

for (const { path, heading } of PAGES) {
  test(`${path} loads with real content`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.getByText(heading, { exact: false }).first()).toBeVisible();
    // Next.js's default 404 page includes this exact phrase -- catches
    // the case where a route resolves to a soft-404 rather than a hard
    // failure (e.g. a broken dynamic route falling through).
    await expect(page.getByText("This page could not be found")).not.toBeVisible();
  });
}

test("blog post page loads", async ({ page }) => {
  const response = await page.goto("/blog/introducing-trimora-systems");
  expect(response.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("nav and footer render on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Trimora Systems" }).first()).toBeVisible();
  // Not asserting the full "© {year} Trimora Systems..." string -- it's
  // split across a {year} interpolation in footer.jsx's source, so a
  // curl-based check against raw (pre-hydration) HTML couldn't reliably
  // confirm the concatenated text a real browser would show. "All rights
  // reserved" is a plain literal string with no interpolation risk,
  // confirmed present via curl before this was written.
  await expect(page.getByText("All rights reserved")).toBeVisible();
});

test("Book a Demo opens the lead form modal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Book a Demo" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Book a Demo").last()).toBeVisible();
});

test("chat widget opens on the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open chat" }).click();
  await expect(page.getByText("Ask about Trimora POS")).toBeVisible();
});
