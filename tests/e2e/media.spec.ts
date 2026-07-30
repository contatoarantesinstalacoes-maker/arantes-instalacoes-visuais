import { expect, test } from "@playwright/test";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDirectory = path.join(process.cwd(), "public", "images");
const videosDirectory = path.join(process.cwd(), "public", "videos");

test("ships images without EXIF and within the delivery dimensions", async () => {
  const imageNames = (await readdir(imagesDirectory)).filter((name) =>
    /\.jpe?g$/i.test(name),
  );

  expect(imageNames.length).toBeGreaterThan(0);

  for (const name of imageNames) {
    const metadata = await sharp(path.join(imagesDirectory, name)).metadata();

    expect(metadata.exif, `${name} must not contain EXIF`).toBeUndefined();
    expect(metadata.width ?? 0, `${name} width`).toBeLessThanOrEqual(1920);
    expect(metadata.height ?? 0, `${name} height`).toBeLessThanOrEqual(1920);
  }
});

test("ships the declared Open Graph image at exactly 1200 by 630", async () => {
  const metadata = await sharp(
    path.join(imagesDirectory, "og-arantes-visual.jpg"),
  ).metadata();

  expect(metadata.width).toBe(1200);
  expect(metadata.height).toBe(630);
  expect(metadata.exif).toBeUndefined();
});

test("ships portfolio videos as H.264 within the media budget", async () => {
  const videoNames = (await readdir(videosDirectory))
    .filter((name) => /^video\d+\.mp4$/.test(name))
    .sort();
  let totalBytes = 0;

  expect(videoNames).toHaveLength(7);

  for (const name of videoNames) {
    const filePath = path.join(videosDirectory, name);
    const [contents, fileStat] = await Promise.all([
      readFile(filePath),
      stat(filePath),
    ]);

    totalBytes += fileStat.size;
    expect(contents.includes(Buffer.from("avc1")), `${name} codec`).toBeTruthy();
    expect(contents.includes(Buffer.from("hvc1")), `${name} codec`).toBeFalsy();
  }

  expect(totalBytes).toBeLessThan(100 * 1024 * 1024);
});

test("does not request the hero video on mobile", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  const heroVideoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/videos/hero.mp4")) {
      heroVideoRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.waitForLoadState("networkidle");

  expect(heroVideoRequests).toEqual([]);
});

test("serves media with explicit browser and edge cache policy", async ({
  request,
}) => {
  for (const asset of ["/images/hero.jpg", "/videos/hero.mp4"]) {
    const response = await request.get(asset);

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["cache-control"]).toContain("max-age=86400");
    expect(response.headers()["cache-control"]).toContain(
      "stale-while-revalidate=604800",
    );
  }
});
