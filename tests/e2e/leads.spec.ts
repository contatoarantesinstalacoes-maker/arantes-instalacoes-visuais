import { expect, test, type Page } from "@playwright/test";

async function completeForm(
  page: Page,
  options: { marketing?: boolean } = {},
) {
  const form = page.getByRole("form", { name: "Solicitação de orçamento" });
  await form.getByLabel("Nome").fill("Maria da Silva");
  await form.getByLabel("WhatsApp").fill("(11) 99999-1234");
  await form.getByLabel(/E-mail/).fill("maria@example.com");
  await form.getByLabel(/Cidade/).fill("São Paulo");
  await form.getByLabel("Serviço").selectOption("Fachadas Comerciais");
  await form
    .getByLabel("Conte sobre o projeto")
    .fill("Preciso instalar uma fachada comercial.");
  await form
    .getByLabel(/Autorizo o uso dos dados/)
    .check();

  if (options.marketing) {
    await form.getByLabel(/Quero receber novidades/).check();
  }

  return form;
}

test("todos os CTAs de orçamento conduzem ao formulário e preservam WhatsApp", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();

  const budgetLinks = page.locator('a[href="#orcamento"]');
  const count = await budgetLinks.count();
  expect(count).toBeGreaterThanOrEqual(10);

  for (let index = 0; index < count; index += 1) {
    await expect(budgetLinks.nth(index)).toHaveAttribute("href", "#orcamento");
  }

  await expect(
    page.getByRole("form", { name: "Solicitação de orçamento" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Continuar pelo WhatsApp" }),
  ).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await expect(
    page.locator("footer").getByRole("link", { name: "Falar pelo WhatsApp" }),
  ).toHaveAttribute("href", /^https:\/\/wa\.me\//);
});

test("envia UTMs e consentimento e registra conversão somente após 201", async ({
  page,
}) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ success: true, replayed: false }),
    });
  });

  await page.goto(
    "/?utm_source=google&utm_medium=cpc&utm_campaign=fachada&utm_term=acm&utm_content=hero",
  );
  await page.getByRole("button", { name: "Aceitar" }).click();
  const form = await completeForm(page, { marketing: true });
  await form.getByRole("button", { name: "Enviar solicitação" }).click();

  await expect(page.getByRole("status")).toContainText("Solicitação recebida");
  expect(payload).toMatchObject({
    name: "Maria da Silva",
    service: "Fachadas Comerciais",
    utm: {
      source: "google",
      medium: "cpc",
      campaign: "fachada",
      term: "acm",
      content: "hero",
    },
    consent: {
      privacy: true,
      marketing: true,
      policy_version: "lead-contact-v1",
    },
  });
  expect(payload).not.toHaveProperty("empresa_id");
  expect(payload).not.toHaveProperty("tenant_id");

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
        event: "lead_conversion",
        replayed: false,
      }),
    ]),
  );
});

test("trata replay 200 como sucesso", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, replayed: true }),
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();
  const form = await completeForm(page);
  await form.getByRole("button", { name: "Enviar solicitação" }).click();
  await expect(page.getByRole("status")).toContainText("Solicitação recebida");

  const events = await page.evaluate(
    () =>
      (
        window as typeof window & {
          dataLayer?: Array<Record<string, unknown>>;
        }
      ).dataLayer ?? [],
  );
  expect(events).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ event: "lead_conversion" }),
    ]),
  );
});

for (const status of [401, 409, 422, 429, 503]) {
  test(`oferece fallback explícito quando a rota retorna ${status}`, async ({
    page,
  }) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({
          error: "submission_failed",
          whatsapp_fallback: true,
        }),
      });
    });
    await page.goto("/");
    await page.getByRole("button", { name: "Recusar" }).click();
    const form = await completeForm(page);
    await form.getByRole("button", { name: "Enviar solicitação" }).click();
    await expect(form).toContainText("Não foi possível enviar agora");
    await expect(
      form.getByRole("link", { name: "Continuar pelo WhatsApp" }),
    ).toBeVisible();
  });
}

test("validação do navegador impede payload incompleto", async ({ page }) => {
  let calls = 0;
  await page.route("**/api/leads", async (route) => {
    calls += 1;
    await route.fulfill({ status: 201, body: "{}" });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Recusar" }).click();
  const form = page.getByRole("form", { name: "Solicitação de orçamento" });
  await form.getByRole("button", { name: "Enviar solicitação" }).click();
  expect(calls).toBe(0);
});
