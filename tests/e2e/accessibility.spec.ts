import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no automatically detectable WCAG A or AA violations", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("keeps the portfolio dialog keyboard-operable and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();
  const firstProject = page.locator("#portfolio").getByRole("button").first();
  await firstProject.scrollIntoViewIfNeeded();
  await firstProject.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar projeto" })).toBeFocused();
  await expect(
    dialog.getByRole("heading", { name: "Vitamedic" }),
  ).toBeVisible();

  await page.keyboard.press("Shift+Tab");
  expect(
    await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: "MIT LOG" })).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(dialog).toBeHidden();
  await expect(firstProject).toBeFocused();
});
