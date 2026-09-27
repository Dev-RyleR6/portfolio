import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "@/css/reset.css";
import "@/css/base.css";
import "@/css/snackbar.css";
import "@/css/section/hero.css";
import "@/css/section/about.css";
import "@/css/section/experience.css";
import "@/css/section/portfolio.css";
import "@/css/section/services.css";
import "@/css/section/tech-stack.css";
import "@/css/section/navigation.css";
import "@/css/section/contact.css";
import "@/css/refresh.css";
import "@/css/section/page-system.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [{ url: "/assets/images/profile.jpg", width: 400, height: 400, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/assets/images/profile.jpg"],
  },
  icons: { icon: "/assets/icons/tech.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const themeScript = `
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (dark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Engineer",
    url: siteUrl,
    sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.gitlab, siteConfig.telegram],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      </head>
      <body className="has-section-dock">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
