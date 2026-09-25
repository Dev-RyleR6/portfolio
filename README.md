# Ryle Anthony Gabotero — Portfolio

A component-based portfolio built with Next.js App Router, React, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and add the Web3Forms access key used by the contact route:

```text
WEB3FORMS_ACCESS_KEY=your_key
```

Set `NEXT_PUBLIC_SITE_URL` in production if the deployment platform does not expose a Vercel production URL. It is used for canonical URLs, the sitemap, and structured metadata.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
