# Ryle Anthony Gabotero — Portfolio

A component-based portfolio built with Next.js App Router, React, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and add the server-side credentials used by the contact route:

```text
RESEND_API_KEY=your_key
CONTACT_EMAIL=you@example.com
RESEND_FROM_EMAIL=contact@your-domain.com
```

Canonical URLs, the sitemap, and structured data use `siteConfig.url` in `lib/site.ts`. Set `NEXT_PUBLIC_SITE_URL` to the same production domain for contact origin checks. Configure hosting to permanently redirect HTTP to HTTPS.

The GitHub activity section reads the contribution calendar through GitHub's GraphQL API. Add a server-only token with read access to the profile data:

```text
GITHUB_TOKEN=github_pat_your_token_here
```

Do not prefix this token with `NEXT_PUBLIC_`. The activity data is cached for one hour, and the section falls back to a profile link if GitHub is unavailable.

The optional footer visitor status uses Upstash Redis for anonymous, short-lived presence:

```text
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_server_only_rest_token
```

The Vercel Upstash integration may provide the equivalent `KV_REST_API_URL` and `KV_REST_API_TOKEN` variables instead; both formats are supported. None of these credentials should use the `NEXT_PUBLIC_` prefix. If Redis is not configured, the active-user field is simply omitted.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

SEO validation and deployment/Search Console steps are recorded in [SEO-AUDIT.md](SEO-AUDIT.md). With a production server on port 3100, run `npm.cmd run audit:seo`; pass the deployed origin to audit the live release.
