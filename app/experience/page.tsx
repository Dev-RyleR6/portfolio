import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextStep } from "@/components/NextStep";
import { SectionDock } from "@/components/SectionDock";
import { getSiteUrl, pageMetadata, siteConfig } from "@/lib/site";
import "@/css/section/experience.css";

export const metadata: Metadata = pageMetadata(
  "Experience & Credentials",
  "National and regional cybersecurity competitions, technical training, and formal assessments earned by Ryle Anthony Gabotero.",
  "/experience"
);

const featuredCompetitions = [
  {
    date: "September 2026",
    datetime: "2026-09",
    standing: "National competitor",
    title: "WorldSkills Philippines Clark 2026",
    role: "Cybersecurity · Team NIR",
    summary:
      "Represented the Negros Island Region at the national skills competition, defending network infrastructure, analyzing network packet captures, and completing incident-response tasks in a timed environment.",
    image: "/assets/images/worldskills/nationals/8d9c0df7-8dbb-4809-a3c0-072189056fb9.jpg",
    imageAlt: "Opening program at WorldSkills Philippines Clark 2026",
    caption: "WorldSkills Philippines national competition ceremony",
    links: [
      { label: "View event gallery →", href: "/gallery#worldskills-national", external: false },
      { label: "TESDA official record ↗", href: "https://tesda.gov.ph/Media/NewsDetail/20489", external: true },
    ],
  },
  {
    date: "June 2026",
    datetime: "2026-06",
    standing: "Regional champion",
    title: "NIR Regional Skills Olympics",
    role: "Gold medal · Cybersecurity",
    summary:
      "Won the Cybersecurity skill area with teammate Earl John Estandarte, qualifying to represent the region at the national WorldSkills competition.",
    image: "/assets/images/worldskills/regional/image.webp",
    imageAlt: "Cybersecurity gold medalists at the NIR Regional Skills Olympics",
    caption: "Regional cybersecurity awarding ceremony",
    links: [
      { label: "View evidence and gallery →", href: "/gallery#worldskills-regional", external: false },
      {
        label: "University record ↗",
        href: "https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics",
        external: true,
      },
    ],
  },
];

const hackathons = [
  {
    date: "November 2025",
    datetime: "2025-11",
    standing: "APAC Participant",
    title: "Huawei Developer Competition",
    role: "Cloud & AI",
    summary:
      "Built and presented a cloud-native intelligent solution through Huawei’s Asia-Pacific developer competition program.",
    href: "/gallery#huawei",
    linkText: "View certificate →",
  },
  {
    date: "July 2025",
    datetime: "2025-07",
    standing: "4th place · Top 5",
    title: "Can You HackIT: The IBPAP Challenge",
    role: "Developer · Team SHIFT",
    summary:
      "Architected and presented a working solution within 24 hours at Cebu Institute of Technology–University.",
    href: "/gallery#hackit",
    linkText: "View event gallery →",
  },
  {
    date: "June 2024",
    datetime: "2024-06",
    standing: "Innovation participant",
    title: "DICT AI.deas for Impact",
    role: "AI for social impact",
    summary:
      "Developed and pitched AI concepts addressing regional challenges during the DICT innovation workshop.",
    href: "/gallery#aideas",
    linkText: "View workshop gallery →",
  },
];

const credentials = [
  {
    issuer: "KOICA DX Center · Hannam University · Silliman University",
    duration: "120 hours · June–July 2026",
    title: "Advanced Big Data Analytics & Artificial Intelligence",
    scoreBadge: "10/10 · Deep Learning Architecture",
    summary:
      "Seven assessed domains spanning machine learning, neural networks, TensorFlow, reinforcement learning, and autonomous AI agents.",
    link: { label: "View training evidence →", href: "/gallery#koica", external: false },
  },
  {
    issuer: "IITP · TOPCIT Philippines",
    duration: "Level 2 · July 23, 2026",
    title: "TOPCIT ICT Competency Assessment",
    scoreBadge: "Score: 365 / 1000 · Level 2",
    summary:
      "Standardized national assessment covering software development, data management, systems architecture, cybersecurity, and IT project management.",
    link: {
      label: "Open score report ↗",
      href: "/assets/docs/My Page _ Score & Certificate _Overall achievement _ TOPCIT.pdf",
      external: true,
    },
  },
];

export default function ExperiencePage() {
  const siteUrl = getSiteUrl();
  const experienceSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Experience & Credentials | Ryle Anthony Gabotero",
    url: `${siteUrl}/experience`,
    description: "National and regional cybersecurity competitions, technical training, and formal assessments earned by Ryle Anthony Gabotero.",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      award: [
        "National Competitor - WorldSkills Philippines Clark 2026 (Cybersecurity)",
        "Gold Medalist - NIR Regional Skills Olympics 2026 (Cybersecurity)",
        "Finalist - Huawei Developer Competition APAC 2025 (Cloud & AI)",
        "4th Place - Can You HackIT: The IBPAP Challenge 2025",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Advanced Big Data Analytics & Artificial Intelligence",
          credentialCategory: "certificate",
          recognizedBy: {
            "@type": "Organization",
            name: "KOICA DX Center, Hannam University, Silliman University",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "TOPCIT ICT Competency Assessment - Level 2",
          credentialCategory: "assessment",
          recognizedBy: {
            "@type": "Organization",
            name: "IITP & TOPCIT Philippines",
          },
        },
      ],
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(experienceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="page-intro page-intro--experience" id="overview">
        <div className="experience-intro__heading">
          <h1>Experience &amp; Competitions</h1>
        </div>
        <div className="experience-intro__details">
          <p className="page-intro__lede">
            Skills competitions, hackathons, and technical training programs.
          </p>
          <a className="resume-entry" href={siteConfig.resume} target="_blank" rel="noopener noreferrer">
            <svg className="resume-entry__document" width={24} height={24} aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M6.75 3.25h7.5l3 3v14.5H6.75z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path
                d="M14.25 3.25v3h3M9.5 11h5M9.5 14.5h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="resume-entry__copy">
              <strong>Résumé</strong>
              <span>Experience, skills, and credentials · PDF</span>
            </span>
            <span className="resume-entry__open">
              Open PDF
              <svg width={16} height={16} aria-hidden="true" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 14 14 4M7 4h7v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </header>

      <section className="content-section" id="competitions" aria-labelledby="competitions-title">
        <div className="section-heading--split">
          <div>
            <h2 id="competitions-title">Competitions &amp; Hackathons</h2>
          </div>
          <p>
            Events and hackathons I’ve competed in, with links to gallery evidence and official records.
          </p>
        </div>
        <div className="timeline-ledger">
          {featuredCompetitions.map((comp, index) => (
            <article className="timeline-ledger__item" key={comp.title}>
              <div className="timeline-ledger__col-meta">
                <time className="timeline-ledger__date" dateTime={comp.datetime}>
                  {comp.date}
                </time>
                <span className="timeline-ledger__standing">{comp.standing}</span>
              </div>
              <div className="timeline-ledger__col-main">
                <h3 className="timeline-ledger__title">{comp.title}</h3>
                <p className="timeline-ledger__role">{comp.role}</p>
                <p className="timeline-ledger__summary">{comp.summary}</p>
                <figure className="timeline-ledger__media-wrap">
                  <Image
                    src={comp.image}
                    width={1080}
                    height={608}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    alt={comp.imageAlt}
                    className="timeline-ledger__media"
                  />
                  <figcaption className="timeline-ledger__caption">{comp.caption}</figcaption>
                </figure>
                <div className="timeline-ledger__actions">
                  {comp.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        className="timeline-ledger__link timeline-ledger__link--secondary"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link key={link.label} className="timeline-ledger__link" href={link.href}>
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
          {hackathons.map((hack) => (
            <article className="timeline-ledger__item" key={hack.title}>
              <div className="timeline-ledger__col-meta">
                <time className="timeline-ledger__date" dateTime={hack.datetime}>
                  {hack.date}
                </time>
                <span className="timeline-ledger__standing">{hack.standing}</span>
              </div>
              <div className="timeline-ledger__col-main">
                <h3 className="timeline-ledger__title">{hack.title}</h3>
                <p className="timeline-ledger__role">{hack.role}</p>
                <p className="timeline-ledger__summary">{hack.summary}</p>
                <div className="timeline-ledger__actions">
                  <Link className="timeline-ledger__link" href={hack.href}>
                    {hack.linkText}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="credentials" aria-labelledby="credentials-title">
        <div className="section-heading--split">
          <div>
            <h2 id="credentials-title">Certifications &amp; Training</h2>
          </div>
          <p>
            Technical training programs and formal assessments.
          </p>
        </div>
        <div className="credentials-register">
          {credentials.map((cred) => (
            <article className="credentials-register__row" key={cred.title}>
              <div className="credentials-register__col-meta">
                <span className="credentials-register__issuer">{cred.issuer}</span>
                <span className="credentials-register__duration">{cred.duration}</span>
              </div>
              <div className="credentials-register__col-main">
                <h3 className="credentials-register__title">{cred.title}</h3>
                <span className="credentials-register__scoreBadge">{cred.scoreBadge}</span>
                <p className="credentials-register__summary">{cred.summary}</p>
                <div className="credentials-register__actions">
                  {cred.link.external ? (
                    <a
                      className="timeline-ledger__link"
                      href={cred.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cred.link.label}
                    </a>
                  ) : (
                    <Link className="timeline-ledger__link" href={cred.link.href}>
                      {cred.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NextStep
        title="See how this experience becomes working software."
        description="The project archive connects these competition and training environments to systems I have designed and shipped."
        links={[
          { href: "/projects", label: "Explore projects" },
          { href: "/contact", label: "Start a conversation" },
        ]}
      />

      <SectionDock
        items={[
          { id: "overview", label: "Overview" },
          { id: "competitions", label: "Competitions" },
          { id: "credentials", label: "Certifications" },
        ]}
      />
    </>
  );
}
