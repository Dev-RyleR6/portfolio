import fs from "node:fs/promises";
import { chromium } from "playwright-core";
import sharp from "sharp";

const sourcePath = "scripts/appicon.png";
const sourceImage = await fs.readFile(sourcePath);
const sourceDataUrl = `data:image/png;base64,${sourceImage.toString("base64")}`;
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();

const outputs = [
  { path: "app/apple-icon.png", size: 180, rounded: true },
  { path: "public/icon.png", size: 192, rounded: true },
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

// Generate multi-resolution favicons and optimized app/icon.png
const pwa192Path = "public/assets/icons/pwa-192.png";
const [img16, img32, img48, img96] = await Promise.all([
  sharp(pwa192Path).resize(16, 16, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
  sharp(pwa192Path).resize(32, 32, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
  sharp(pwa192Path).resize(48, 48, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
  sharp(pwa192Path).resize(96, 96, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
]);

await fs.writeFile("public/favicon-16x16.png", img16);
await fs.writeFile("public/favicon-32x32.png", img32);
await fs.writeFile("public/favicon-48x48.png", img48);
await fs.writeFile("app/icon.png", img96);

const count = 3;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(count, 4);

const images = [
  { w: 16, h: 16, b: img16 },
  { w: 32, h: 32, b: img32 },
  { w: 48, h: 48, b: img48 },
];

let offset = 6 + count * 16;
const entries = [];
for (const img of images) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(img.w, 0);
  entry.writeUInt8(img.h, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(img.b.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  offset += img.b.length;
}

const ico = Buffer.concat([header, ...entries, ...images.map((i) => i.b)]);
await fs.writeFile("public/favicon.ico", ico);
await fs.writeFile("app/favicon.ico", ico);

console.log("Successfully generated all PWA icons and Google-compliant multi-resolution favicons!");
