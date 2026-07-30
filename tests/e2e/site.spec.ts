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
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://arantesvisual.com.br/images/og-arantes-visual.jpg",
  );
  await expect(
    page.locator('script[type="application/ld+json"]'),
  ).toHaveCount(2);

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
  expect(response.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
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
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Abrir menu" }),
  ).toHaveAttribute("aria-expanded", "false");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("records service, footer and portfolio conversions in one dataLayer", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();
  await page.evaluate(() => {
    document.addEventListener("click", (event) => event.preventDefault(), {
      capture: true,
    });
  });

  await page
    .locator("#servicos")
    .getByRole("link", { name: "Solicitar orçamento →" })
    .first()
    .click();
  await page
    .locator("footer")
    .getByRole("link", { name: "Falar pelo WhatsApp" })
    .click();
  await page.locator("#portfolio").getByRole("button").first().click();

  const events = await page.evaluate(
    () =>
      (
        window as typeof window & {
          dataLayer?: Array<Record<string, unknown>>;
        }
      ).dataLayer ?? [],
  );

  expect(events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        event: "whatsapp_click",
        button_location: "service_fachadas_comerciais",
      }),
      expect.objectContaining({
        event: "whatsapp_click",
        button_location: "footer_primary",
      }),
      expect.objectContaining({
        event: "portfolio_open",
        project: "Vitamedic",
      }),
    ]),
  );
});

test("keeps the full page within mobile, tablet and desktop viewports", async ({
  page,
}) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow, `${viewport.width}px viewport`).toBe(false);
  }
});
