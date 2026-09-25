import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const executablePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = "artifacts/layout-audit";
const routes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["experience", "/experience"],
  ["gallery", "/gallery"],
  ["contact", "/contact"],
];
const viewports = [
  ["desktop", { width: 1440, height: 1200 }],
  ["mobile", { width: 390, height: 844 }],
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const report = [];

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, colorScheme: "dark", deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const [routeName, path] of routes) {
    await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${outputDir}/${routeName}-${viewportName}.png`, fullPage: false });
    const metrics = await page.evaluate(() => {
      const interactive = [...document.querySelectorAll("a, button, input, textarea")];
      const smallTargets = interactive
        .map((element) => ({ label: (element.textContent || element.getAttribute("aria-label") || element.tagName).trim().slice(0, 40), height: Math.round(element.getBoundingClientRect().height) }))
        .filter((item) => item.height > 0 && item.height < 40);
      const allowedOverflow = (element) =>
        Boolean(
          element.closest(
            ".site-tabs__links, .section-dock, .skip-link, .contact-form__captcha-wrap--hidden",
          ),
        );
      const overflowElements = [...document.querySelectorAll("body *")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return !allowedOverflow(element) && (rect.right > window.innerWidth + 1 || rect.left < -1);
        })
        .slice(0, 12)
        .map((element) => ({ tag: element.tagName.toLowerCase(), className: String(element.className).slice(0, 80), rect: element.getBoundingClientRect().toJSON() }));
      const fontSize = (selector) => {
        const element = document.querySelector(selector);
        return element ? getComputedStyle(element).fontSize : null;
      };
      return {
        viewportSize: { width: innerWidth, height: innerHeight },
        documentWidth: document.documentElement.scrollWidth,
        overflowElements,
        smallTargets,
        fonts: { profileName: fontSize(".profile-name"), pageTitle: fontSize("h1"), sectionTitle: fontSize("h2"), body: fontSize(".section-text, .page-intro__lede, .profile-headline") },
      };
    });
    report.push({ route: path, viewport: viewportName, ...metrics });
  }
  await context.close();
}

await browser.close();
await writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
for (const item of report) {
  console.log(`${item.viewport.padEnd(7)} ${item.route.padEnd(12)} viewport=${item.viewportSize.width} document=${item.documentWidth} overflow=${item.overflowElements.length} smallTargets=${item.smallTargets.length}`);
}
