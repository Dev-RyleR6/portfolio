import type { Metadata } from "next";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryGrid";
import { NextStep } from "@/components/NextStep";
import { SectionDock } from "@/components/SectionDock";
import { getSiteUrl, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Activity Gallery", "Competition, training, and workshop evidence from HackForGov 5, WorldSkills, KOICA, Huawei, Can You HackIT, and DICT AI.deas.", "/gallery");

const hackforgov: GalleryImage[] = [
  { src: "/assets/images/hackforgov/hck4govshift.webp", width: 1215, height: 911, alt: "Team SHIFT on stage at HackForGov 5 Negros Island Region in Bacolod City", caption: "Team SHIFT on stage at HackForGov 5 NIR", variant: "gallery-item--wide" },
  { src: "/assets/images/hackforgov/certificate.webp", width: 2048, height: 1449, alt: "HackForGov 5 Certificate of Participation from DICT and CERT-PH", caption: "Official DICT & CERT-PH certificate of participation", variant: "gallery-item--document" },
  { src: "/assets/images/hackforgov/certph.webp", width: 683, height: 911, alt: "CERT-PH HackForGov 5 event banner and competition credentials", caption: "CERT-PH event banner and competition kit" },
  { src: "/assets/images/hackforgov/shift.webp", width: 512, height: 911, alt: "Team SHIFT studio portrait for HackForGov", caption: "Team SHIFT competition squad portrait" },
];

const national: GalleryImage[] = [
  { src: "/assets/images/worldskills/nationals/8d9c0df7-8dbb-4809-a3c0-072189056fb9.jpg", width: 2048, height: 1536, alt: "Opening program stage at WorldSkills Philippines Clark 2026", caption: "WorldSkills Philippines opening program", variant: "gallery-item--wide" },
  { src: "/assets/images/worldskills/nationals/IMG_3422.JPG", width: 2656, height: 1992, alt: "Team NIR Cybersecurity competitors at their stations", caption: "Team NIR at the national competition stations" },
  { src: "/assets/images/experience/worldskills-team-nir.webp", width: 1365, height: 1152, alt: "Team NIR Cyber Security competitors with their expert", caption: "Team NIR Cyber Security", variant: "gallery-item--contain" },
  { src: "/assets/images/worldskills/nationals/worldskills-cybersecurity-group.jpg", width: 2048, height: 1536, alt: "Cybersecurity competitors at WorldSkills Philippines Clark 2026", caption: "National cybersecurity competitors" },
  { src: "/assets/images/worldskills/nationals/IMG_3212.JPG", width: 2656, height: 1992, alt: "Competitors and expert discussing a cybersecurity task", caption: "Technical discussion during the event" },
];

const regional: GalleryImage[] = [
  { src: "/assets/images/worldskills/regional/image.webp", width: 1920, height: 1279, alt: "Cybersecurity gold medalists at the NIR Regional Skills Olympics", caption: "Cybersecurity awarding ceremony" },
  { src: "/assets/images/worldskills/regional/7d0953b1-da82-47b0-a924-263d45a849d9.jpg", width: 2048, height: 1365, alt: "Foundation University delegation at the Regional Skills Olympics", caption: "Foundation University delegation" },
  { src: "/assets/images/evidence/worldskills-regional-gold.webp", width: 1600, height: 1201, alt: "WorldSkills regional gold medal certificate in Cybersecurity", caption: "Gold medal certificate", variant: "gallery-item--document" },
  { src: "/assets/images/evidence/worldskills-regional-certificates.webp", width: 1200, height: 1604, alt: "Recognition and participation certificates", caption: "Recognition and participation certificates", variant: "gallery-item--document" },
];

const koica: GalleryImage[] = [
  { src: "/assets/images/koica/d915f4f0-dc73-4783-8342-510dd5113937.jpg", width: 2048, height: 1152, alt: "KOICA training participants and instructors", caption: "Training participants and instructors", variant: "gallery-item--wide" },
  { src: "/assets/images/koica/1128b8b7-33fd-4697-8db8-fc9c5c4e1048.jpg", width: 1182, height: 665, alt: "KOICA participants after presentation exercises", caption: "Presentation exercises" },
  { src: "/assets/images/koica/8788d8eb-6a86-4e6d-bafc-b5dc5ac366a3.jpg", width: 1182, height: 666, alt: "KOICA trainees holding certificates", caption: "Program completion and competency results" },
  { src: "/assets/images/koica/bdebab4f-c647-4631-aa7e-b79867e6bbe9.jpg", width: 2048, height: 1365, alt: "Ryle receiving a KOICA certificate", caption: "Certificate presentation" },
  { src: "/assets/images/evidence/koica-competency.webp", width: 1600, height: 1067, alt: "KOICA competency certificate", caption: "Seven-domain competency assessment", variant: "gallery-item--document" },
];

const hackit: GalleryImage[] = [
  { src: "/assets/images/Hackathon2.jpg", width: 2160, height: 2880, alt: "Team SHIFT developing its solution", caption: "Team SHIFT during the build session", variant: "gallery-item--portrait" },
  { src: "/assets/images/Hackathon.jpg", width: 1542, height: 2047, alt: "Team SHIFT and mentors", caption: "Team SHIFT and mentors", variant: "gallery-item--portrait" },
  { src: "/assets/images/4th.jpg", width: 1536, height: 2048, alt: "Top 5 team announcement", caption: "Top 5 team announcement", variant: "gallery-item--portrait" },
];

const aideas: GalleryImage[] = [
  { src: "/assets/images/Aideas.jpg", width: 1293, height: 1084, alt: "Participants at the DICT AI.deas workshop", caption: "Workshop participants", variant: "gallery-item--wide" },
  { src: "/assets/images/aideas2.jpg", width: 1293, height: 1084, alt: "Participants working during the AI.deas workshop", caption: "Hands-on workshop session" },
  { src: "/assets/images/aideas3.jpg", width: 1293, height: 1084, alt: "AI.deas certificate recipients", caption: "Completion recognition" },
];

function GalleryHeading({
  meta,
  title,
  description,
  links,
}: {
  meta: string;
  title: string;
  description: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="gallery-section-heading">
      <div>
        <p className="gallery-section-meta">{meta}</p>
        <h2>{title}</h2>
      </div>
      <div className="gallery-section-heading__content">
        <p>{description}</p>
        {links && links.length > 0 && (
          <div className="gallery-section-links">
            {links.map((link) => (
              <a
                key={link.label}
                className="gallery-section-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 14 14 4M7 4h7v7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const siteUrl = getSiteUrl();
  const galleryImages = [...hackforgov, ...national, ...regional, ...koica, ...hackit, ...aideas];
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteUrl}/gallery#image-gallery`,
    name: "Technical work and activity gallery | Ryle Anthony Gabotero",
    url: `${siteUrl}/gallery`,
    description: "Competition, training, workshop, certificate, and technical activity evidence from Ryle Anthony Gabotero.",
    author: { "@id": `${siteUrl}/#person` },
    contentLocation: [
      {
        "@type": "Place",
        name: "Bacolod City, Negros Island Region, Philippines",
        geo: { "@type": "GeoCoordinates", latitude: 10.6766, longitude: 122.9509 },
      },
      {
        "@type": "Place",
        name: "Clark, Pampanga, Philippines",
        geo: { "@type": "GeoCoordinates", latitude: 15.1855, longitude: 120.5592 },
      },
      {
        "@type": "Place",
        name: "Dumaguete City, Negros Island Region, Philippines",
        geo: { "@type": "GeoCoordinates", latitude: 9.3068, longitude: 123.3054 },
      },
      {
        "@type": "Place",
        name: "Cebu City, Central Visayas, Philippines",
        geo: { "@type": "GeoCoordinates", latitude: 10.3157, longitude: 123.8854 },
      },
    ],
    about: [
      { "@type": "Event", name: "HackForGov 5 – Negros Island Region", url: `${siteUrl}/experience#hackforgov` },
      { "@type": "Event", name: "WorldSkills Philippines Clark 2026", url: `${siteUrl}/experience#worldskills-national` },
      { "@type": "Event", name: "NIR Regional Skills Olympics 2026", url: `${siteUrl}/experience#worldskills-regional` },
      { "@type": "EducationalOccupationalCredential", name: "KOICA Advanced Big Data Analytics & Artificial Intelligence", url: `${siteUrl}/gallery#koica` },
      { "@type": "Event", name: "Can You HackIT: The IBPAP Challenge", url: `${siteUrl}/experience#hackit` },
      { "@type": "EducationalOccupationalCredential", name: "Huawei Developer Competition", url: `${siteUrl}/gallery#huawei` },
      { "@type": "Event", name: "DICT AI.deas for Impact", url: `${siteUrl}/experience#aideas` },
    ],
    subjectOf: [
      {
        "@type": "SocialMediaPosting",
        name: "Foundation University CCS Official Announcement: Team SHIFT at HackForGov 5 NIR",
        url: "https://www.facebook.com/share/p/18fJmyJseu/",
      },
      {
        "@type": "SocialMediaPosting",
        name: "DICT Negros Occidental Official HackForGov Record",
        url: "https://web.facebook.com/DICTNegrosOccidental/posts/%F0%9D%97%94%F0%9D%97%A5%F0%9D%97%9C%F0%9D%97%95%F0%9D%97%94-%F0%9D%97%A1%F0%9D%97%98%F0%9D%97%9A%F0%9D%97%A5%F0%9D%97%98%F0%9D%97%A1%F0%9D%97%A6%F0%9D%97%98the-department-of-information-and-communications-technology-dict-t/122255575184055743/?_rdc=1&_rdr#",
      },
      {
        "@type": "SocialMediaPosting",
        name: "Foundation University CCS Official Announcement: Delegation at WorldSkills Philippines National Competition",
        url: "https://www.facebook.com/share/p/1F9F1QvPm2/",
      },
      {
        "@type": "Article",
        name: "Foundation University Bags Gold Medals at the NIR Regional Skills Olympics",
        url: "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
      },
      {
        "@type": "NewsArticle",
        name: "TESDA WorldSkills Philippines National Skills Competition",
        url: "https://tesda.gov.ph/Media/NewsDetail/20489",
      },
    ],
    associatedMedia: galleryImages.map((image, index) => ({
      "@type": "ImageObject",
      contentUrl: `${siteUrl}${image.src}`,
      description: image.alt,
      caption: image.caption,
      representativeOfPage: index === 0,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallerySchema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="archive-header gallery-header" id="overview">
        <h1 className="archive-title">The work behind the results</h1>
        <p className="section-text">A visual record of competitions, training, workshops, and the evidence behind the experience. Open any image for a closer look.</p>
      </header>

      <section className="gallery-section" id="hackforgov">
        <GalleryHeading
          meta="October 12, 2026 · Bacolod City"
          title="HackForGov 5 – Negros Island Region"
          description="Capture-the-Flag (CTF) cybersecurity competition organized by DICT Cybersecurity Bureau and CERT-PH at Roys Hotel and Convention Center."
          links={[
            {
              label: "FU CCS Announcement (Facebook)",
              href: "https://www.facebook.com/share/p/18fJmyJseu/",
            },
            {
              label: "DICT Negros Occidental Coverage (Facebook)",
              href: "https://web.facebook.com/DICTNegrosOccidental/posts/%F0%9D%97%94%F0%9D%97%A5%F0%9D%97%9C%F0%9D%97%95%F0%9D%97%94-%F0%9D%97%A1%F0%9D%97%98%F0%9D%97%9A%F0%9D%97%A5%F0%9D%97%98%F0%9D%97%A1%F0%9D%97%A6%F0%9D%97%98the-department-of-information-and-communications-technology-dict-t/122255575184055743/?_rdc=1&_rdr#",
            },
          ]}
        />
        <GalleryGrid images={hackforgov} columns="three" priorityFirst />
      </section>
      <section className="gallery-section" id="worldskills-national">
        <GalleryHeading
          meta="September 7–11, 2026 · Clark, Pampanga"
          title="WorldSkills Philippines Clark 2026"
          description="Representing the Negros Island Region in the Cybersecurity skill area at the national competition."
          links={[
            {
              label: "FU CCS Delegation Post (Facebook)",
              href: "https://www.facebook.com/share/p/1F9F1QvPm2/",
            },
            {
              label: "TESDA Official Record",
              href: "https://tesda.gov.ph/Media/NewsDetail/20489",
            },
          ]}
        />
        <GalleryGrid images={national} priorityFirst />
      </section>
      <section className="gallery-section" id="worldskills-regional">
        <GalleryHeading
          meta="June 8–10, 2026 · Dumaguete City"
          title="NIR Regional Skills Olympics"
          description="Cybersecurity gold medal and qualification for the WorldSkills Philippines national competition."
          links={[
            {
              label: "University Record (Foundation University)",
              href: "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
            },
          ]}
        />
        <GalleryGrid images={regional} columns="evidence" />
      </section>
      <section className="gallery-section" id="koica">
        <GalleryHeading meta="June 22–July 31, 2026 · Silliman University" title="KOICA Advanced AI & Data Analytics" description="Highlights from the 120-hour program delivered through the KOICA Digital Transformation Center." />
        <GalleryGrid images={koica} />
      </section>
      <section className="gallery-section" id="huawei">
        <GalleryHeading meta="November 2025 · APAC" title="Huawei Developer Competition" description="Participation in Huawei’s APAC developer competition program." />
        <a className="gallery-document-card" href="/assets/docs/HDC2511200D53A1DE.pdf" target="_blank" rel="noopener noreferrer">
          <span className="gallery-document-card__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M5 2.75h6l4 4v10.5H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M11 2.75v4h4M7.75 10h4.5M7.75 13h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="gallery-document-card__copy">
            <span className="credential-issuer">Certificate evidence</span>
            <strong>Developer Competition Certificate</strong>
            <span>The original activity record in PDF format.</span>
          </span>
          <svg className="gallery-document-card__arrow" aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
      <section className="gallery-section" id="hackit">
        <GalleryHeading meta="July 2025 · Cebu City" title="Can You HackIT: The IBPAP Challenge" description="Team SHIFT’s build session and Top 5 recognition at Cebu Institute of Technology–University." />
        <GalleryGrid images={hackit} columns="three" />
      </section>
      <section className="gallery-section" id="aideas">
        <GalleryHeading meta="June 25–26, 2024 · Dumaguete City" title="DICT AI.deas for Impact" description="AI for Innovation and Social Impact workshop activities and completion recognition." />
        <GalleryGrid images={aideas} />
      </section>
      <NextStep
        title="The evidence is only part of the story."
        description="See the responsibilities, results, and technical work behind these records, or reach out directly."
        links={[
          { href: "/experience", label: "Review experience" },
          { href: "/contact", label: "Contact me" },
        ]}
      />
      <SectionDock label="Gallery sections" items={[{ id: "overview", label: "Overview" }, { id: "hackforgov", label: "HackForGov" }, { id: "worldskills-national", label: "National" }, { id: "worldskills-regional", label: "Regional" }, { id: "koica", label: "KOICA" }, { id: "huawei", label: "Huawei" }, { id: "hackit", label: "HackIT" }, { id: "aideas", label: "AI.deas" }]} />
    </>
  );
}
