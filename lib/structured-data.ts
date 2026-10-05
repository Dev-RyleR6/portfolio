import { getSiteUrl, siteConfig } from "@/lib/site";

export function profileStructuredData() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: siteConfig.name,
        alternateName: ["Ryle Gabotero", "Ryle Anthony Gabotero Portfolio"],
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#person` },
        author: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        url: `${siteUrl}/`,
        name: siteConfig.name,
        alternateName: ["Ryle Gabotero", "Ryle Anthony M. Gabotero", "Dev-RyleR6", "dev_R6"],
        jobTitle: "Software Engineer",
        image: { "@id": `${siteUrl}/#profile-image` },
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Foundation University",
          url: "https://www.foundationu.edu.ph",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dumaguete City",
          addressRegion: "Negros Island Region",
          addressCountry: "PH",
        },
        knowsAbout: ["Software Engineering", "Backend Development", "Cybersecurity", "Systems Administration", "Network Security", "Computer Vision", "Applied Artificial Intelligence", "Linux", "TypeScript", "Next.js", "Node.js"],
        award: ["Gold Medalist - NIR Regional Skills Olympics 2026 (Cybersecurity)", "4th Place - Can You HackIT: The IBPAP Challenge 2025"],
        sameAs: [
          siteConfig.github,
          siteConfig.gitlab,
          siteConfig.linkedin,
        ],
        subjectOf: [
          {
            "@type": "Article",
            name: "Foundation University Bags Gold Medals at the NIR Regional Skills Olympics",
            url: "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
          },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#profile-image`,
        url: `${siteUrl}${siteConfig.profileImage}`,
        contentUrl: `${siteUrl}${siteConfig.profileImage}`,
        caption: siteConfig.name,
        width: 709,
        height: 945,
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: `${siteUrl}/`,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/#person` },
        primaryImageOfPage: { "@id": `${siteUrl}/#profile-image` },
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}
