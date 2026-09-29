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

Set `NEXT_PUBLIC_SITE_URL` in production if the deployment platform does not expose a Vercel production URL. It is used for canonical URLs, the sitemap, and structured metadata.

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
