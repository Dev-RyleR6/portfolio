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

The optional footer visitor status uses the Vercel Web Analytics API for lifetime pageviews and Upstash Redis for anonymous, short-lived presence:

```text
VERCEL_API_TOKEN=your_server_only_access_token
VERCEL_PROJECT_ID=prj_your_project_id
VERCEL_TEAM_ID=team_your_team_id
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_server_only_rest_token
```

`VERCEL_TEAM_ID` is only needed for team-owned projects. Vercel can provide the project and organization IDs automatically when system environment variables are enabled. None of these credentials should use the `NEXT_PUBLIC_` prefix. If analytics or Redis is not configured, the unavailable fields are simply omitted.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
