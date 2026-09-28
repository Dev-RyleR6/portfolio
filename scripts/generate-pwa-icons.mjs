import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const sourcePath = "scripts/appicon.png";
const sourceImage = await fs.readFile(sourcePath);
const sourceDataUrl = `data:image/png;base64,${sourceImage.toString("base64")}`;
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();

const outputs = [
  { path: "app/icon.png", size: 512, rounded: true },
  { path: "app/apple-icon.png", size: 180, rounded: true },
  { path: "public/icon.png", size: 512, rounded: true },
  { path: "public/assets/icons/pwa-192.png", size: 192, rounded: true },
  { path: "public/assets/icons/pwa-512.png", size: 512, rounded: true },
  { path: "public/assets/icons/pwa-maskable-512.png", size: 512, rounded: false },
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
          body { background: transparent; }
          #icon {
            width: 100%;
            height: 100%;
            border-radius: ${output.rounded ? "22%" : "0"};
            background: #000000;
            overflow: hidden;
          }
          #icon img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 65% 100%;
          }
        </style>
      </head>
      <body>
        <div id="icon"><img src="${sourceDataUrl}" alt="" /></div>
      </body>
    </html>
  `);
  await page.locator("#icon").screenshot({ path: output.path, omitBackground: true });
}

await browser.close();
console.log(`Generated ${outputs.length} PWA icons from ${sourcePath}`);
