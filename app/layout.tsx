import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "@/css/reset.css";
import "@/css/base.css";
import "@/css/snackbar.css";
import "@/css/section/hero.css";
import "@/css/section/about.css";
import "@/css/section/portfolio.css";

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
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/assets/images/profile2.webp",
        width: 709,
        height: 945,
        alt: `${siteConfig.name} | Software Engineer`,
      },
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  verification: {
    google: "DR8xHqXTLS90oHcFRZT82RH2lhiHGUl8_XEgBiWjGlw",
  },
  other: {
    thumbnail: `${siteUrl}/assets/images/profile2.webp`,
    "geo.region": "PH-NIR",
    "geo.placename": "Dumaguete City, Negros Island Region, Philippines",
    "geo.position": "9.3068;123.3054",
    ICBM: "9.3068, 123.3054",
  },
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
    let saved = null;
    try {
      saved = localStorage.getItem("portfolio-theme");
    } catch {}
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved === "dark" || saved === "light" ? saved : (dark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const rootSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        alternateName: ["Ryle Gabotero", "devR6", "ryleanthony-gabotero.tech"],
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        url: siteUrl,
        name: siteConfig.name,
        alternateName: ["devR6", "Ryle Anthony Gabotero"],
        jobTitle: "Software Engineer",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/images/profile2.webp`,
          caption: siteConfig.name,
        },
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Foundation University",
          url: "https://www.foundationu.edu.ph",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dumaguete City",
          addressRegion: "Negros Island Region",
          addressCountry: "PH",
          postalCode: "6200",
        },
        homeLocation: {
          "@type": "Place",
          name: "Dumaguete City, Negros Island Region, Philippines",
          geo: {
            "@type": "GeoCoordinates",
            latitude: 9.3068,
            longitude: 123.3054,
          },
        },
        knowsAbout: [
          "Backend Architecture",
          "Cybersecurity",
          "Network Packet Analysis",
          "Computer Vision",
          "YOLOv8",
          "TypeScript",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Redis",
          "Linux Hardening",
        ],
        award: [
          "National Competitor - WorldSkills Philippines Clark 2026 (Cybersecurity)",
          "Gold Medalist - NIR Regional Skills Olympics 2026 (Cybersecurity)",
          "Participant - Huawei Developer Competition APAC 2025 (Cloud & AI)",
          "4th Place - Can You HackIT: The IBPAP Challenge 2025",
          "TOPCIT ICT Competency Assessment - Level 2 (Score: 365/1000)",
        ],
        sameAs: [
          siteConfig.github,
          siteConfig.gitlab,
          siteConfig.linkedin,
          siteConfig.telegram,
        ],
        subjectOf: [
          {
            "@type": "Article",
            name: "WorldSkills Philippines Clark 2026 official record",
            url: "https://tesda.gov.ph/Media/NewsDetail/20489",
          },
          {
            "@type": "Article",
            name: "Foundation University Bags Gold Medals at the NIR Regional Skills Olympics",
            url: "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
          },
        ],
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#navigation`,
        name: ["Projects", "Experience", "Gallery", "Contact"],
        url: [
          `${siteUrl}/projects`,
          `${siteUrl}/experience`,
          `${siteUrl}/gallery`,
          `${siteUrl}/contact`,
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <meta name="thumbnail" content={`${siteUrl}/assets/images/profile2.webp`} />
        <meta name="geo.region" content="PH-NIR" />
        <meta name="geo.placename" content="Dumaguete City, Negros Island Region, Philippines" />
        <meta name="geo.position" content="9.3068;123.3054" />
        <meta name="ICBM" content="9.3068, 123.3054" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="has-section-dock">
        <SiteShell>{children}</SiteShell>
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  );
}
