import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "@/css/reset.css";
import "@/css/base.css";
import "@/css/snackbar.css";
import "@/css/section/hero.css";
import "@/css/section/about.css";
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${siteConfig.name} | Software Engineer`,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${siteConfig.name} - Software Engineer Portfolio`,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        alternateName: "devR6",
        jobTitle: "Software Engineer",
        url: siteUrl,
        image: `${siteUrl}/assets/images/profile2.webp`,
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Foundation University",
          url: "https://www.foundationu.edu.ph",
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "Negros Island Region",
          addressCountry: "PH",
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
          "Finalist - Huawei Developer Competition APAC 2025 (Cloud & AI)",
          "4th Place - Can You HackIT: The IBPAP Challenge 2025",
          "TOPCIT ICT Competency Assessment - Level 2 (Score: 365/1000)",
        ],
        sameAs: [
          siteConfig.github,
          siteConfig.gitlab,
          siteConfig.linkedin,
          siteConfig.telegram,
          "https://tesda.gov.ph/Media/NewsDetail/20489",
          "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#navigation`,
        name: "Primary Navigation",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Profile",
            description: "Background, technical focus, and skills overview",
            url: `${siteUrl}/`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Projects",
            description: "Software case studies spanning streaming proxies, computer vision, and systems architecture",
            url: `${siteUrl}/projects`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Experience",
            description: "Cybersecurity competitions, hackathons, and certifications",
            url: `${siteUrl}/experience`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Gallery",
            description: "Photographic and credential evidence from competitions and training",
            url: `${siteUrl}/gallery`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 5,
            name: "Contact",
            description: "Direct communication channels and inquiry dispatch",
            url: `${siteUrl}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="has-section-dock">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
