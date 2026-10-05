# SEO implementation audit

Canonical identity: **Ryle Anthony Gabotero**, Software Engineer, https://www.ryleanthony-gabotero.tech/, `/#person`.

## Changes

- `lib/site.ts`: fixed canonical origin independent of localhost/Vercel/environment overrides; shared identity, portrait path, factual description, absolute page titles and complete social titles.
- `lib/structured-data.ts` (new) and `app/page.tsx`: one homepage graph linking WebSite, Person, ProfilePage, and the preferred portrait ImageObject. Correct site alternate names, person aliases, publisher/author, broad knowsAbout, general address and professional sameAs links. Homepage description includes systems administration.
- `app/layout.tsx`: removed duplicate manual head/metadata icons, portrait/social-image mixing, thumbnail duplication, obsolete geo tags, precise coordinates, and repeated site-wide identity graph. App Router owns icon declarations. Retained Google verification and branded 1200x630 social image.
- `app/experience/page.tsx`: connected the existing Person data to the canonical `#person`; participation and assessment records remain visible but are not labeled as awards.
- `app/contact/page.tsx`: sameAs uses professional profiles; Telegram remains available as a visible contact channel.
- `app/projects/page.tsx` and `app/projects/[id]/page.tsx`: removed invalid ItemList.author and SoftwareSourceCode.applicationCategory properties; authorship stays on each project, technologies use about, and programmingLanguage contains actual languages.
- `app/sitemap.ts`: kept all 11 routes and removed invented modification dates. No reliable updatedAt field exists in project data.
- `app/manifest.ts`: preferred site name.
- `next.config.ts`: permanent non-www redirect preserving path and query; existing security headers preserved.
- `public/llms.txt`: concise factual identity, pages, projects, public profiles and one person-specific external reference. Not treated as a ranking mechanism.
- `scripts/generate-pwa-icons.mjs`, `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`, and the three PWA PNGs: All favicon and app icons use a square crop of `public/assets/images/profile2.webp`, as requested. ICO contains 16, 32, 48 and 96px entries. Removed conflicting public/favicon.ico and public/icon.png copies.
- `scripts/audit-seo.mjs` (new), `package.json`: reusable rendered-output audit. README and .env.example document canonical configuration.

No layout, styling, navigation or project functionality changes. Existing homepage H1, professional role, project descriptions, technologies, case-study outcomes and experience evidence are server-rendered. No hidden text, meta keywords, SEO package, artificial timestamps or fabricated credentials added.

## Evidence and limitations

The Foundation University article explicitly names Ryle Anthony Gabotero and Earl John Estandarte as Cybersecurity gold medalists. Its subjectOf reference remains. The general TESDA event article could not be confirmed as a reference to Ryle and was removed from Person.subjectOf. The fourth-place award is supported by existing visible experience content and evidence. Roboflow was not added: no verified public profile was found in the repository. University association uses affiliation rather than implying graduation through alumniOf.

Public-page source/configuration audit found no production noindex/nofollow rule. X-Robots-Tag applies only to the visitor API; robots.txt disallows only /api/ and permits public pages and assets. No middleware/proxy indexing blocker is present.

## Verification

- `npm.cmd run build`: passed; static public pages and metadata routes generated.
- TypeScript check: passed.
- Full repository lint: 0 errors, 94 existing warnings in bundled skill scripts. Changed code lint: passed without warnings.
- `npm.cmd run audit:seo` against `next start --port 3100`: passed all 11 pages; validates unique/nonduplicated titles, canonical host/path, descriptions, OG/Twitter, one server-rendered H1, icon declarations, JSON parsing, raw URLs, entity references, sitemap, robots, dimensions, ICO entries, manifest assets and 308 host redirect including query.
- JSON-LD checks: 0 errors. Additional validation against the official current Schema.org vocabulary checked 268 properties across all 11 pages: 0 unknown-type/property/domain errors. Property ranges, Google rich-result eligibility and optional-field warnings are not covered by these checks. No official Rich Results Test result is claimed.
- Next.js normalizes the homepage canonical/OG URL without a trailing slash; this resolves to the same root URL as the trailing-slash sitemap and schema URLs.
- Live production baseline: homepage, robots.txt, sitemap.xml, favicon.ico, favicon-48x48.png, profile2.webp, opengraph-image and llms.txt returned HTTP 200. Non-www HTTPS and www HTTP returned 308 to HTTPS www. Live HTML still contains the previous duplicate icons, coordinates and domain alternateName until deployment.

The audit accepts an optional third argument with the official vocabulary JSON-LD file from https://schema.org/version/latest/schemaorg-current-https.jsonld.

Run after deploying:

```powershell
npm.cmd run audit:seo -- https://www.ryleanthony-gabotero.tech
```

## Manual actions

1. Deploy these changes through the existing hosting workflow, then rerun the live audit. Nothing has been deployed by this audit.
2. In Google Search Console, verify/access the Domain property `ryleanthony-gabotero.tech` or URL-prefix property `https://www.ryleanthony-gabotero.tech/`. The verification token is preserved; ownership/access could not be checked here.
3. Submit https://www.ryleanthony-gabotero.tech/sitemap.xml under Sitemaps. Inspect the homepage and request indexing after deployment. Inspect the other pages below if needed; compare Google's selected canonical with the declared canonical.
4. Run the deployed homepage through https://search.google.com/test/rich-results and https://validator.schema.org/. WebSite site-name markup is not a dedicated rich-result feature; absence of a rich-result enhancement does not invalidate site-name signals. Review any validator warnings, especially optional ProfilePage dates; omit dates unless reliable.

Exact page URLs for Search Console URL Inspection:

- https://www.ryleanthony-gabotero.tech/
- https://www.ryleanthony-gabotero.tech/projects
- https://www.ryleanthony-gabotero.tech/projects/myanime
- https://www.ryleanthony-gabotero.tech/projects/proxy-server
- https://www.ryleanthony-gabotero.tech/projects/safeview
- https://www.ryleanthony-gabotero.tech/projects/ovalens
- https://www.ryleanthony-gabotero.tech/projects/archronicle
- https://www.ryleanthony-gabotero.tech/projects/pickleworld
- https://www.ryleanthony-gabotero.tech/experience
- https://www.ryleanthony-gabotero.tech/gallery
- https://www.ryleanthony-gabotero.tech/contact

Asset checks in the browser (request indexing for the homepage, not favicon assets):

- https://www.ryleanthony-gabotero.tech/robots.txt
- https://www.ryleanthony-gabotero.tech/favicon.ico
- https://www.ryleanthony-gabotero.tech/favicon-48x48.png
- https://www.ryleanthony-gabotero.tech/assets/images/profile2.webp
- https://www.ryleanthony-gabotero.tech/opengraph-image

Google can retain the old appearance while deployment, recrawling, image fetching and processing catch up. Site names, favicons and search thumbnails are selected automatically, and no markup guarantees a particular thumbnail. Google says favicon refreshes can take several days to several weeks. Social preview caches may refresh separately.

## Primary guidance reviewed

- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/ai-features
- Installed Next.js 16.3.6 docs for metadata, icons, JSON-LD, sitemap, robots and redirects.
