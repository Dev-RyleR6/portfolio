import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});

for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport, colorScheme: "dark" });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:4208", { waitUntil: "networkidle" });
  const cover = page.locator(".profile-cover-container");
  const bounds = await cover.boundingBox();
  if (!bounds) throw new Error("Cover did not render");
  await page.mouse.move(bounds.x + bounds.width * 0.58, bounds.y + bounds.height * 0.5);
  await page.waitForTimeout(250);
  const metrics = await page.evaluate(() => {
    const cover = document.querySelector(".profile-cover-container").getBoundingClientRect();
    const stage = document.querySelector(".profile-cover-wordmark-stage").getBoundingClientRect();
    return {
      cover: { width: cover.width, height: cover.height },
      stage: { width: stage.width, height: stage.height },
      stageRatio: Number((stage.width / stage.height).toFixed(3)),
    };
  });
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: `artifacts/wordmark-stage-${name}.png`, fullPage: false });
  console.log(JSON.stringify({ name, metrics, errors }));
  await page.close();
}

await browser.close();
