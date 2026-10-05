import fs from "node:fs/promises";
import sharp from "sharp";

// One portrait source; App Router owns the favicon, icon, and Apple icon routes.
const portrait = await fs.readFile("public/assets/images/profile2.webp");
// Use the same square portrait crop for every icon.
const source = await sharp(portrait).resize(512, 512, { fit: "cover", position: "centre" }).ensureAlpha().png().toBuffer();
const outputs = [
  ["app/apple-icon.png", 180], ["app/icon.png", 96],
  ["public/favicon-16x16.png", 16], ["public/favicon-32x32.png", 32],
  ["public/favicon-48x48.png", 48], ["public/assets/icons/pwa-192.png", 192],
  ["public/assets/icons/pwa-512.png", 512],
];
for (const [file, size] of outputs) {
  await sharp(source).resize(size, size).png().toFile(file);
}
// Leave a safe area around the portrait for launcher masks.
await sharp(source).resize(320, 320).extend({
  top: 96, bottom: 96, left: 96, right: 96, background: "#090a0d",
}).png().toFile("public/assets/icons/pwa-maskable-512.png");

const sizes = [16, 32, 48, 96];
const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + images.length * 16;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[index], 0);
  entry.writeUInt8(sizes[index], 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});
await fs.writeFile("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
console.log("Generated profile-photo favicon (16/32/48/96), Apple and PWA icons.");
