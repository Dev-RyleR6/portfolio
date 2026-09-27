import type { Metadata } from "next";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryGrid";
import { SectionDock } from "@/components/SectionDock";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Activity Gallery", "Competition, training, and workshop evidence from WorldSkills, KOICA, Huawei, Can You HackIT, and DICT AI.deas.", "/gallery");

const national: GalleryImage[] = [
  { src: "/assets/images/worldskills/nationals/8d9c0df7-8dbb-4809-a3c0-072189056fb9.jpg", width: 2048, height: 1536, alt: "Opening program stage at WorldSkills Philippines Clark 2026", caption: "WorldSkills Philippines opening program", variant: "gallery-item--wide" },
  { src: "/assets/images/worldskills/nationals/IMG_3422.JPG", width: 2656, height: 1992, alt: "Team NIR Cybersecurity competitors at their stations", caption: "Team NIR at the national competition stations" },
  { src: "/assets/images/experience/worldskills-team-nir.webp", width: 1365, height: 1152, alt: "Team NIR Cyber Security competitors with their expert", caption: "Team NIR Cyber Security", variant: "gallery-item--contain" },
  { src: "/assets/images/worldskills/nationals/worldskills-cybersecurity-group.jpg", width: 2048, height: 1536, alt: "Cybersecurity competitors at WorldSkills Philippines Clark 2026", caption: "National cybersecurity competitors" },
  { src: "/assets/images/worldskills/nationals/IMG_3212.JPG", width: 2656, height: 1992, alt: "Competitors and expert discussing a cybersecurity task", caption: "Technical discussion during the event" },
];

const regional: GalleryImage[] = [
  { src: "/assets/images/worldskills/regional/image.png", width: 1920, height: 1279, alt: "Cybersecurity gold medalists at the NIR Regional Skills Olympics", caption: "Cybersecurity awarding ceremony" },
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

function GalleryHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="gallery-section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>{description}</p></div>;
}

export default function GalleryPage() {
  return (
    <>
        <header className="archive-header gallery-header" id="overview"><p className="eyebrow">Activity gallery</p><h1 className="archive-title">Competitions, training, and workshops</h1><p className="section-text">Selected moments and supporting evidence from technical activities. Select an image to inspect it without leaving the gallery.</p></header>
        <section className="gallery-section" id="worldskills-national"><GalleryHeading eyebrow="September 7–11, 2026 · Clark, Pampanga" title="WorldSkills Philippines Clark 2026" description="Representing the Negros Island Region in the Cybersecurity skill area at the national competition." /><GalleryGrid images={national} /></section>
        <section className="gallery-section" id="worldskills-regional"><GalleryHeading eyebrow="June 8–10, 2026 · Dumaguete City" title="NIR Regional Skills Olympics" description="Cybersecurity gold medal and qualification for the WorldSkills Philippines national competition." /><GalleryGrid images={regional} columns="evidence" /></section>
        <section className="gallery-section" id="koica"><GalleryHeading eyebrow="June 22–July 31, 2026 · Silliman University" title="KOICA Advanced AI & Data Analytics" description="Highlights from the 120-hour program delivered through the KOICA Digital Transformation Center." /><GalleryGrid images={koica} /></section>
        <section className="gallery-section" id="huawei"><GalleryHeading eyebrow="November 2025 · APAC" title="Huawei Developer Competition" description="Participation in Huawei’s APAC developer competition program." /><div className="gallery-document-card"><div><p className="credential-issuer">Activity evidence</p><h3>Developer Competition Certificate</h3><p>The available record for this activity is the original certificate PDF.</p></div><a className="button button-outline" href="/assets/docs/HDC2511200D53A1DE.pdf" target="_blank" rel="noopener noreferrer">View certificate PDF ↗</a></div></section>
        <section className="gallery-section" id="hackit"><GalleryHeading eyebrow="July 2025 · Cebu City" title="Can You HackIT: The IBPAP Challenge" description="Team SHIFT’s build session and Top 5 recognition at Cebu Institute of Technology–University." /><GalleryGrid images={hackit} columns="three" /></section>
        <section className="gallery-section" id="aideas"><GalleryHeading eyebrow="June 25–26, 2024 · Dumaguete City" title="DICT AI.deas for Impact" description="AI for Innovation and Social Impact workshop activities and completion recognition." /><GalleryGrid images={aideas} /></section>
      <SectionDock label="Gallery sections" items={[{ id: "overview", label: "Overview" }, { id: "worldskills-national", label: "National" }, { id: "worldskills-regional", label: "Regional" }, { id: "koica", label: "KOICA" }, { id: "huawei", label: "Huawei" }, { id: "hackit", label: "HackIT" }, { id: "aideas", label: "AI.deas" }]} />
    </>
  );
}
