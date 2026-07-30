import { expect, test } from "@playwright/test";

test("serves the conversion page and technical SEO endpoints", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /instalação técnica em comunicação visual/i,
    }),
  ).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("id", "main-content");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://arantesvisual.com.br",
  );

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  await expect(robots.text()).resolves.toContain(
    "https://arantesvisual.com.br/sitemap.xml",
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  await expect(sitemap.text()).resolves.toContain(
    "<loc>https://arantesvisual.com.br</loc>",
  );
});

test("serves every portfolio image with the exact production path", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page.locator("#portfolio").scrollIntoViewIfNeeded();

  await expect(page.locator("#portfolio img").first()).toBeVisible();

  for (let index = 1; index <= 13; index += 1) {
    const response = await request.get(`/images/portfolio${index}.jpg`);
    expect(response.ok(), `portfolio${index}.jpg should be available`).toBeTruthy();
  }
});

test("exposes security headers", async ({ request }) => {
  const response = await request.get("/");

  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response.headers()["permissions-policy"]).toContain("camera=()");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});

test("does not load analytics before consent", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("region", { name: "Preferências de cookies" }),
  ).toBeVisible();
  await expect(
    page.locator('script[src*="googletagmanager.com"]'),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Recusar" }).click();
  await expect(
    page.getByRole("button", { name: "Preferências de cookies" }),
  ).toBeVisible();
  await expect(
    page.locator('script[src*="googletagmanager.com"]'),
  ).toHaveCount(0);
});

test("loads analytics only after explicit consent", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Aceitar" }).click();

  await expect(
    page.locator('script[src*="googletagmanager.com"]'),
  ).toHaveCount(1);
});

test("keeps mobile navigation and layout usable", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Abrir menu" });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();
  await expect(
    page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Serviços" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
