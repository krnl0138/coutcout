import { expect, test } from "@playwright/test";

test.describe("Tests for `settings` page", () => {
  test.beforeEach(async ({ page, browser }) => {
    await page.goto("http://localhost:3000/settings");
    // await page.screenshot({ path: `./settings-${browser.version()}.png` });
  });

  test("`Setting` page is loaded and open", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveText("Settings");
  });

  test("`Setting` page has an avatar with a username", async ({ page }) => {
    const avatar = page.locator("img");
    const username = page.locator("text=John Doe");
  });
});
