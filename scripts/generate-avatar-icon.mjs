import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

async function generate() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const webpBuffer = fs.readFileSync('public/assets/images/profile2.webp');
  const base64Data = webpBuffer.toString('base64');
  const dataUrl = `data:image/webp;base64,${base64Data}`;

  // We want to create:
  // 1. A 192x192 PNG (and 48x48) cropped to Ryle's face with clean circular/rounded-square styling
  // Let's create an HTML page with canvas or SVG to preview and export
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .icon-container {
            width: 192px;
            height: 192px;
            border-radius: 50%;
            overflow: hidden;
            background: #0d0f12;
            position: relative;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
          }
          .icon-container img {
            width: 192px;
            height: 192px;
            object-fit: cover;
            object-position: 45% 24%;
            transform: scale(1.45);
            transform-origin: 45% 24%;
            display: block;
          }
        </style>
      </head>
      <body>
        <div id="icon" class="icon-container">
          <img src="${dataUrl}" alt="Avatar" />
        </div>
      </body>
    </html>
  `);

  await page.waitForSelector('#icon img');
  await page.waitForTimeout(300);

  const iconElement = await page.$('#icon');
  
  // Save as app/icon.png (192x192)
  await iconElement.screenshot({
    path: 'app/icon.png',
    omitBackground: true,
  });

  // Save as app/apple-icon.png (192x192)
  await iconElement.screenshot({
    path: 'app/apple-icon.png',
    omitBackground: true,
  });

  // Save as public/icon.png
  await iconElement.screenshot({
    path: 'public/icon.png',
    omitBackground: true,
  });

  console.log('Successfully generated app/icon.png, app/apple-icon.png, and public/icon.png');
  await browser.close();
}

generate().catch(console.error);
