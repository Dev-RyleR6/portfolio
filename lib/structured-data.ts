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
        hasOccupation: [
          {
            "@type": "Occupation",
            name: "Full-Stack Web Developer",
            occupationalCategory: "Software Developers",
          },
          {
            "@type": "Occupation",
            name: "Co-Founder & Technical Lead",
            occupationalCategory: "Technical Leadership & Software Engineering",
          },
        ],
        image: { "@id": `${siteUrl}/#profile-image` },
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Foundation University",
          url: "https://www.foundationu.edu.ph",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Foundation University",
          url: "https://www.foundationu.edu.ph",
        },
        founder: {
          "@type": "Organization",
          name: "Team SHIFT (Students Harnessing Interest for Technology)",
          location: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dumaguete City",
              addressRegion: "Negros Island Region",
              addressCountry: "PH",
            },
          },
        },
        memberOf: [
          {
            "@type": "Organization",
            name: "Team SHIFT (Students Harnessing Interest for Technology)",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dumaguete City",
          addressRegion: "Negros Island Region",
          addressCountry: "PH",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.3068,
          longitude: 123.3054,
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
        workLocation: {
          "@type": "Place",
          name: "Dumaguete City, Negros Island Region, Philippines",
        },
        knowsAbout: [
          "Software Engineering",
          "Full-Stack Development",
          "Web Development",
          "Backend Development",
          "Cybersecurity",
          "Ethical Hacking",
          "Penetration Testing",
          "Vulnerability Assessment",
          "Security Auditing",
          "Incident Response",
          "Digital Forensics",
          "Cloud Security",
          "DevOps",
          "Continuous Integration/Continuous Deployment (CI/CD)",
          "Infrastructure as Code (IaC)",
          "Containerization",
          "Microservices",
          "Cryptographic Protocols",
          "Machine Learning",
          "Data Science",
          "Data Analysis",
          "Systems Administration",
          "Network Security",
          "Computer Vision",
          "Applied Artificial Intelligence",
          "Edge AI",
          "IoT & Embedded Systems",
          "YOLOv8",
          "Linux",
          "TypeScript",
          "Next.js",
          "Node.js",
        ],
        award: [
          "Gold Medalist - NIR Regional Skills Olympics 2026 (Cybersecurity)",
          "National Competitor - WorldSkills Philippines Clark 2026 (Cybersecurity)",
          "6th Place - HackForGov 5 Negros Island Region 2026 (Cybersecurity CTF)",
          "4th Place - Can You HackIT: The IBPAP Challenge 2025",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Advanced Big Data Analytics & Artificial Intelligence",
            credentialCategory: "certificate",
            url: `${siteUrl}/gallery#koica`,
            recognizedBy: {
              "@type": "EducationalOrganization",
              name: "KOICA DX Center, Hannam University & Silliman University",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "TOPCIT ICT Competency Assessment - Level 2",
            credentialCategory: "assessment",
            url: `${siteUrl}/assets/docs/My%20Page%20_%20Score%20%26%20Certificate%20_Overall%20achievement%20_%20TOPCIT.pdf`,
            recognizedBy: {
              "@type": "Organization",
              name: "IITP & TOPCIT Philippines",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Huawei Developer Competition APAC Certificate",
            credentialCategory: "certificate",
            url: `${siteUrl}/gallery#huawei`,
            recognizedBy: {
              "@type": "Organization",
              name: "Huawei",
            },
          },
        ],
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
          {
            "@type": "SocialMediaPosting",
            name: "Foundation University CCS Official Announcement: Team SHIFT at HackForGov 5 NIR",
            url: "https://www.facebook.com/share/p/18fJmyJseu/",
            publisher: {
              "@type": "EducationalOrganization",
              name: "Foundation University College of Computer Studies",
            },
          },
          {
            "@type": "SocialMediaPosting",
            name: "HackForGov 5 Negros Island Region Capture-the-Flag Competition Official DICT Announcement",
            url: "https://web.facebook.com/DICTNegrosOccidental/posts/%F0%9D%97%94%F0%9D%97%A5%F0%9D%97%9C%F0%9D%97%95%F0%9D%97%94-%F0%9D%97%A1%F0%9D%97%98%F0%9D%97%9A%F0%9D%97%A5%F0%9D%97%98%F0%9D%97%A1%F0%9D%97%A6%F0%9D%97%98the-department-of-information-and-communications-technology-dict-t/122255575184055743/?_rdc=1&_rdr#",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "Department of Information and Communications Technology - Negros Occidental",
            },
          },
          {
            "@type": "SocialMediaPosting",
            name: "Foundation University CCS Official Announcement: Delegation at WorldSkills Philippines National Competition",
            url: "https://www.facebook.com/share/p/1F9F1QvPm2/",
            publisher: {
              "@type": "EducationalOrganization",
              name: "Foundation University College of Computer Studies",
            },
          },
          {
            "@type": "NewsArticle",
            name: "TESDA WorldSkills Philippines National Skills Competition",
            url: "https://tesda.gov.ph/Media/NewsDetail/20489",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "Technical Education and Skills Development Authority (TESDA)",
            },
          },
          {
            "@type": "SocialMediaPosting",
            name: "FoundationU CCS Official Announcement: KOICA Advanced Big Data Analytics Program Completion",
            url: "https://www.facebook.com/share/p/19YjD6Wvbb/",
            publisher: {
              "@type": "EducationalOrganization",
              name: "Foundation University CCS Executive Council of Student Leaders",
            },
          },
          {
            "@type": "SocialMediaPosting",
            name: "IBPAP Official Can You HackIT Challenge Coverage",
            url: "https://www.facebook.com/share/1DdVpUSuUw/",
            publisher: {
              "@type": "Organization",
              name: "IT and Business Process Association of the Philippines (IBPAP)",
            },
          },
          {
            "@type": "SocialMediaPosting",
            name: "Team SHIFT at Can You HackIT IBPAP Challenge",
            url: "https://www.facebook.com/share/p/1KdQQ9QoQ5/",
          },
          {
            "@type": "SocialMediaPosting",
            name: "DICT IIDB Region 7 AI.deas for Impact Official Coverage",
            url: "https://www.facebook.com/share/p/18oYbEbkf5/",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "DICT ICT Industry Development Bureau (IIDB) Region 7",
            },
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
