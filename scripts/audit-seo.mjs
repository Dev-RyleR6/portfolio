import assert from "node:assert/strict";
import sharp from "sharp";
import http from "node:http";
import fs from "node:fs/promises";

const origin = process.argv[2] || "http://localhost:3100";
const canonical = "https://www.ryleanthony-gabotero.tech";
const name = "Ryle Anthony Gabotero";
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map(match => attributes(match[0]));
// Optional third argument: downloaded official Schema.org JSON-LD vocabulary.
const vocabularyFile = process.argv[3];
const vocabulary = vocabularyFile ? JSON.parse(await fs.readFile(vocabularyFile, "utf8")) : null;
const vocabularyEntries = vocabulary ? new Map(vocabulary["@graph"].map(node => [node["@id"], node])) : null;
const list = value => value ? (Array.isArray(value) ? value : [value]) : [];
let vocabularyChecks = 0;
function inherits(type, domain, seen = new Set()) {
  if (type === domain) return true;
  if (seen.has(type)) return false;
  seen.add(type);
  return list(vocabularyEntries.get(type)?.["rdfs:subClassOf"]).some(parent => inherits(parent["@id"], domain, seen));
}
function validateVocabulary(value) {
  if (Array.isArray(value)) return value.forEach(validateVocabulary);
  if (!value || typeof value !== "object") return;
  const types = list(value["@type"]).map(type => "schema:" + type);
  types.forEach(type => assert(vocabularyEntries.has(type), "Unknown schema type: " + type));
  for (const [key, item] of Object.entries(value)) {
    if (!key.startsWith("@")) {
      const property = vocabularyEntries.get("schema:" + key);
      assert(property, "Unknown schema property: " + key);
      const domains = list(property["schema:domainIncludes"]).map(domain => domain["@id"]);
      assert(!types.length || !domains.length || types.some(type => domains.some(domain => inherits(type, domain))), "Incompatible property: " + types + "." + key);
      vocabularyChecks++;
    }
    validateVocabulary(item);
  }
}
async function read(path) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, path);
  assert(!response.headers.get("x-robots-tag")?.includes("noindex"), path);
  return response;
}
const sitemap = await (await read("/sitemap.xml")).text();
assert(!sitemap.includes("<lastmod>"), "No invented modification dates");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => {
  assert(match[1].startsWith(`${canonical}/`));
  return new URL(match[1]).pathname;
});
assert.equal(paths.length, 11);
const titles = new Set();
for (const path of paths) {
  const html = await (await read(path)).text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title, `${path} title`);
  assert(!titles.has(title), `${path} unique title`);
  titles.add(title);
  assert.equal(title.split(name).length - 1, 1, `${path} nonduplicated identity`);
  const links = tags(html, "link");
  const canonicals = links.filter(link => link.rel === "canonical");
  assert.equal(canonicals.length, 1, `${path} one canonical`);
  assert.equal(new URL(canonicals[0].href).href, `${canonical}${path}`);
  const meta = tags(html, "meta");
  assert.equal(meta.filter(tag => tag.name === "description").length, 1);
  assert.equal(meta.find(tag => tag.property === "og:title")?.content, title);
  assert.equal(new URL(meta.find(tag => tag.property === "og:url")?.content).href, `${canonical}${path}`);
  assert.equal(meta.find(tag => tag.property === "og:site_name")?.content, name);
  assert(meta.find(tag => tag.property === "og:description")?.content);
  assert(meta.find(tag => tag.name === "twitter:image")?.content.includes("/opengraph-image"));
  assert(!meta.some(tag => /^(geo\.|ICBM|keywords)/i.test(tag.name || "")));
  assert(!meta.some(tag => tag.name === "robots" && /noindex|nofollow/.test(tag.content)));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path} one server-rendered H1`);
  const icons = links.filter(link => link.rel === "icon");
  assert(icons.some(icon => icon.href.startsWith("/favicon.ico")));
  assert.equal(new Set(icons.map(icon => icon.href)).size, icons.length);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.equal(schemas.length, 1, `${path} one JSON-LD script`);
  function validate(value, key = "") {
    if (typeof value === "string") {
      assert(!value.includes("GeoCoordinates"));
      if (["@context", "@id", "url", "contentUrl", "sameAs", "codeRepository"].includes(key)) {
        assert(!/[\[\]\s]/.test(value), `Raw URL: ${value}`);
        const url = new URL(value);
        assert(["https:", "mailto:"].includes(url.protocol));
        if (url.hostname.includes("ryleanthony-gabotero.tech")) assert.equal(url.hostname, new URL(canonical).hostname);
      }
    } else if (Array.isArray(value)) value.forEach(item => validate(item, key));
    else if (value && typeof value === "object") Object.entries(value).forEach(([property, item]) => validate(item, property));
  }
  schemas.forEach(schema => { assert.equal(schema["@context"], "https://schema.org"); validate(schema); if (vocabularyEntries) validateVocabulary(schema); });
  if (path === "/") {
    assert.equal(title, `${name} | Software Engineer`);
    const graph = schemas[0]["@graph"];
    assert.equal(graph.length, 4);
    const entity = type => graph.find(node => node["@type"] === type);
    const person = entity("Person"), website = entity("WebSite"), profile = entity("ProfilePage"), image = entity("ImageObject");
    assert.equal(website.name, name);
    assert.deepEqual(website.alternateName, ["Ryle Gabotero", "Ryle Anthony Gabotero Portfolio"]);
    assert.equal(website.publisher["@id"], person["@id"]);
    assert.equal(website.author["@id"], person["@id"]);
    assert.equal(profile.mainEntity["@id"], person["@id"]);
    assert.equal(profile.primaryImageOfPage["@id"], image["@id"]);
    assert.equal(person.image["@id"], image["@id"]);
    assert.equal(image.contentUrl, `${canonical}/assets/images/profile2.webp`);
    assert.equal(image.url, image.contentUrl);
    assert.equal(meta.find(tag => tag.name === "thumbnail")?.content, image.url);
    console.log("Homepage graph: WebSite, Person, ImageObject, ProfilePage; references and URLs valid.");
  }
  console.log(`PASS ${path}: title, canonical, social metadata, H1, icons, JSON-LD`);
}
const robots = await (await read("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert(!/Disallow: \/(?:assets|_next|favicon|opengraph)/.test(robots));
for (const [path, width, height] of [["/favicon-48x48.png",48,48], ["/icon.png",96,96], ["/apple-icon.png",180,180], ["/assets/images/profile2.webp",709,945], ["/opengraph-image",1200,630]]) {
  const response = await read(path);
  const metadata = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
  assert.equal(metadata.width,width); assert.equal(metadata.height,height);
}
const ico = Buffer.from(await (await read("/favicon.ico")).arrayBuffer());
assert.equal(ico.readUInt16LE(2),1); assert.equal(ico.readUInt16LE(4),4);
assert.deepEqual([0,1,2,3].map(index => ico[6+index*16]),[16,32,48,96]);
for (let index = 0; index < 4; index++) {
  const entry = 6 + index * 16;
  const offset = ico.readUInt32LE(entry + 12);
  const length = ico.readUInt32LE(entry + 8);
  const metadata = await sharp(ico.subarray(offset, offset + length)).metadata();
  assert(metadata.hasAlpha, "ICO PNG entries must be RGBA for Next.js decoding");
}
const manifest = await (await read("/manifest.webmanifest")).json();
assert.equal(manifest.name,name);
for (const icon of manifest.icons) await read(icon.src);
await read("/llms.txt");
if (new URL(origin).hostname === "localhost") {
  // Node fetch rewrites Host; node:http permits testing the host redirect.
  const response = await new Promise((resolve, reject) => {
    http.get(origin + "/projects/safeview?source=audit", {headers:{Host:"ryleanthony-gabotero.tech"}}, response => {
      response.resume();
      resolve(response);
    }).on("error", reject);
  });
  assert.equal(response.statusCode,308);
  assert.equal(response.headers.location,canonical + "/projects/safeview?source=audit");
}
console.log("PASS sitemap, robots, image dimensions, 4-resolution ICO, manifest, llms.txt, permanent-host redirect.");
if (vocabularyEntries) console.log("Official Schema.org vocabulary: " + vocabularyChecks + " property checks; 0 unknown-type/property/domain errors.");
console.log("Automated checks: 0 errors. Google rich-result eligibility and optional-field warnings require separate validation.");

