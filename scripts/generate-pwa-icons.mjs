import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const sourcePath = "public/assets/icons/tech.svg";
const sourceSvg = await fs.readFile(sourcePath, "utf8");
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();

const outputs = [
  { path: "app/icon.png", size: 512 },
  { path: "app/apple-icon.png", size: 180 },
  { path: "public/icon.png", size: 512 },
  { path: "public/assets/icons/pwa-192.png", size: 192 },
  { path: "public/assets/icons/pwa-512.png", size: 512 },
  { path: "public/assets/icons/pwa-maskable-512.png", size: 512 },
];

for (const output of outputs) {
  await page.setViewportSize({ width: output.size, height: output.size });
  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; }
          html, body { width: 100%; height: 100%; margin: 0; }
          body { background: #000000; }
          #icon {
            display: grid;
            width: 100%;
            height: 100%;
            place-items: center;
            background: #000000;
          }
          #icon svg {
            width: 54%;
            height: 54%;
          }
          #icon path { fill: #54c99b; }
        </style>
      </head>
      <body>
        <div id="icon">${sourceSvg}</div>
      </body>
    </html>
  `);
  await page.locator("#icon").screenshot({ path: output.path });
}

await browser.close();
console.log(`Generated ${outputs.length} PWA icons from ${sourcePath}`);
