import type { Metadata } from "next";

export const siteConfig = {
  name: "Ryle Anthony Gabotero",
  url: "https://www.ryleanthony-gabotero.tech",
  profileImage: "/assets/images/profile2.webp",
  title: "Ryle Anthony Gabotero | Software Engineer",
  description:
    "Ryle Anthony Gabotero is a software engineer in Dumaguete City, Philippines, working across backend development, cybersecurity, systems administration, and applied AI.",
  email: "ryleanthony.gabotero@gmail.com",
  github: "https://github.com/Dev-RyleR6",
  gitlab: "https://gitlab.com/ryleanthony.gabotero",
  linkedin: "https://www.linkedin.com/in/rylegabotero/",
  telegram: "https://t.me/ryleanthony",
  resume: "/assets/docs/RyleGaboteroCV.pdf",
};

export function getSiteUrl() {
  // Keep indexing signals on the custom domain, including preview builds.
  return siteConfig.url;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === "/" ? siteConfig.title : `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
