import type { Metadata } from "next";

export const siteConfig = {
  name: "Ryle Anthony Gabotero",
  title: "Ryle Anthony Gabotero | Software Engineer",
  description:
    "Software engineer focused on backend systems, cybersecurity, applied AI, and data engineering, with AI integrated into the development workflow.",
  email: "ryleanthony.gabotero@gmail.com",
  github: "https://github.com/Dev-RyleR6",
  gitlab: "https://gitlab.com/ryleanthony.gabotero",
  linkedin: "https://www.linkedin.com/in/rylegabotero/",
  telegram: "https://t.me/ryleanthony",
  resume: "/assets/docs/RyleGaboteroCV.pdf",
};

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
