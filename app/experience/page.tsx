import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextStep } from "@/components/NextStep";
import { SectionDock } from "@/components/SectionDock";
import { getSiteUrl, pageMetadata, siteConfig } from "@/lib/site";
import "@/css/section/experience.css";

export const metadata: Metadata = pageMetadata(
  "Experience & Credentials",
  "Client software engineering, student technical leadership at Team SHIFT, applied AI capstone research, national cybersecurity competitions, and technical credentials earned by Ryle Anthony Gabotero.",
  "/experience"
);

type WorkExperienceItem = {
  date: string;
  datetime: string;
  standing: string;
  title: string;
  role: string;
  summary: string;
  deliverables: { label: string; details: string }[];
  technologies: string[];
  links: { label: string; href: string; external?: boolean; secondary?: boolean }[];
};

const workExperience: WorkExperienceItem[] = [
  {
    date: "2024 – Present",
    datetime: "2024/2026",
    standing: "Client & Production Work",
    title: "Full-Stack Web Developer",
    role: "Web Development & Systems",
    summary:
      "I design, build, and ship custom websites and web systems for clients, tailoring the design, user flows, and backend functionality to their specific requirements.",
    deliverables: [
      {
        label: "Clinic & Healthcare Website",
        details:
          "Designed, built, and shipped a modern, responsive clinic website featuring clean navigation, clear medical service information, and appointment/inquiry flows optimized for patients across all devices.",
      },
      {
        label: "Custom Client Websites",
        details:
          "Developed and deployed bespoke websites and business landing pages, focusing on speed, accessible design, SEO performance, and reliable production hosting.",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "WordPress",
      "Laravel",
      "CodeIgniter",
      "Node.js",
      "Express",
      "MySQL",
      "WebSockets",
      "Tailwind CSS",
      "REST APIs",
    ],
    links: [
      { label: "Start a project →", href: "/contact", external: false },
    ],
  },
  {
    date: "2024 – Present",
    datetime: "2024/2026",
    standing: "Student Tech Team & Leadership",
    title: "Co-Founder & Technical Lead",
    role: "Team SHIFT (Students Harnessing Interest for Technology)",
    summary:
      "Co-founded SHIFT (Students Harnessing Interest for Technology), a student-led engineering team dedicated to building real projects, shipping university internal systems, and competing across software development, systems administration, networking, AI & data science, and cybersecurity.",
    deliverables: [
      {
        label: "University Internal Tools & Campus Systems",
        details:
          "Architected and built internal tools, administrative systems, and responsive websites for university departments and student organizations to modernize manual campus workflows.",
      },
      {
        label: "Facial Recognition Attendance Checker (FRACS)",
        details:
          "Engineered an automated attendance tracking platform combining computer-vision face recognition with backend logging to replace manual sign-in queues with low-latency biometric verification.",
      },
      {
        label: "Technical Competition & Hackathon Squads",
        details:
          "Led multidisciplinary student teams for hackathons, CTFs, and tech challenges, including achieving Top 5 honors at the Can You HackIT: IBPAP Challenge.",
      },
    ],
    technologies: [
      "Python",
      "OpenCV",
      "Face Recognition",
      "Node.js",
      "Express",
      "TypeScript",
      "React",
      "Linux",
      "Systems Administration",
      "Networking",
      "Git",
    ],
    links: [
      { label: "View Team SHIFT in gallery →", href: "/gallery#hackit", external: false },
    ],
  },
  {
    date: "2024 – 2025",
    datetime: "2024/2025",
    standing: "Undergraduate Capstone Engineering",
    title: "Lead Computer Vision & Embedded IoT Engineer",
    role: "OvaLens Ecosystem (Automated Duck Egg Candling & Sorting)",
    summary:
      "Architected and built an end-to-end autonomous duck-egg candling and fertility sorting machine for my undergraduate capstone—spanning custom computer vision model optimization, low-compute edge deployment, multi-microcontroller hardware orchestration, and offline-first synchronization.",
    deliverables: [
      {
        label: "Custom YOLOv8 Training, Hyperparameter Tuning & ONNX Quantization",
        details:
          "Trained and fine-tuned a custom YOLOv8 computer vision model on our curated candling dataset, iteratively tuned hyperparameters for detection accuracy, and quantized the model via ONNX for efficient, low-latency inference on a resource-constrained Raspberry Pi.",
      },
      {
        label: "Electromechanical Hardware Orchestration & Microcontroller Actuation",
        details:
          "Engineered the entire IoT and hardware architecture, interfacing ESP32 microcontrollers, NEMA stepper motor drivers for precise conveyor movement, camera modules under controlled exposure, and servo diversion gates to physically sort eggs based on real-time classification.",
      },
      {
        label: "Edge Control Application, Backend & Offline Synchronization",
        details:
          "Developed a native application that manages hardware states, conveyor timing, and classification pipelines in real time, backed by a companion web system and offline-sync engine that caches records locally during network dropouts and automatically syncs upon reconnection.",
      },
    ],
    technologies: [
      "Python",
      "YOLOv8",
      "ONNX",
      "PyTorch",
      "Raspberry Pi",
      "ESP32",
      "C/C++",
      "OpenCV",
      "NEMA Stepper Drivers",
      "Hardware IoT",
      "WebSockets",
      "Offline Sync",
    ],
    links: [
      { label: "Explore OvaLens case study →", href: "/projects/ovalens", external: false },
      { label: "Model repository ↗", href: "https://github.com/Dev-RyleR6/OvaLens-Ecosystem", external: true, secondary: true },
    ],
  },
];

const featuredCompetitions = [
  {
    date: "September 2026",
    datetime: "2026-09",
    standing: "National competitor",
    title: "WorldSkills Philippines Clark 2026",
    role: "Cybersecurity · Team NIR",
    summary:
      "Represented the Negros Island Region at the national skills competition, working across both defensive and offensive cybersecurity tasks. It includes securing network infrastructure, analyzing packet captures, responding to incidents, identifying and exploiting vulnerabilities, and completing CTF-style hacking challenges in a timed competition environment.",
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
    description: "Work experience, national and regional cybersecurity competitions, technical training, and formal assessments earned by Ryle Anthony Gabotero.",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.name,
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
      memberOf: [
        {
          "@type": "Organization",
          name: "Team SHIFT (Students Harnessing Interest for Technology)",
        },
      ],
      award: [
        "Gold Medalist - NIR Regional Skills Olympics 2026 (Cybersecurity)",
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
            Client work, student engineering leadership at Team SHIFT, applied AI capstone research, and national skills competitions.
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

      <section className="content-section" id="work" aria-labelledby="work-title">
        <div className="section-heading--split">
          <div>
            <h2 id="work-title">Work &amp; Engineering Experience</h2>
          </div>
          <p>
            Client production systems, student engineering leadership, and applied AI capstone research.
          </p>
        </div>
        <div className="timeline-ledger">
          {workExperience.map((item) => (
            <article className="timeline-ledger__item" key={item.title}>
              <div className="timeline-ledger__col-meta">
                <time className="timeline-ledger__date" dateTime={item.datetime}>
                  {item.date}
                </time>
                <span className="timeline-ledger__standing">{item.standing}</span>
              </div>
              <div className="timeline-ledger__col-main">
                <h3 className="timeline-ledger__title">{item.title}</h3>
                <p className="timeline-ledger__role">{item.role}</p>
                <p className="timeline-ledger__summary">{item.summary}</p>

                <ul className="timeline-ledger__deliverables" aria-label="Key shipped work">
                  {item.deliverables.map((deliv) => (
                    <li className="timeline-ledger__deliverable-item" key={deliv.label}>
                      <strong>{deliv.label}:</strong> {deliv.details}
                    </li>
                  ))}
                </ul>

                <details className="timeline-ledger__tech-details">
                  <summary className="timeline-ledger__tech-summary">
                    <span className="timeline-ledger__tech-label">Stack</span>
                    <span className="timeline-ledger__tech-dot" aria-hidden="true">·</span>
                    <span className="timeline-ledger__tech-count">{item.technologies.length} technologies</span>
                    <svg
                      className="timeline-ledger__tech-chevron"
                      width={14}
                      height={14}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="timeline-ledger__tech-list" aria-label="Technologies used">
                    {item.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </details>

                <div className="timeline-ledger__actions">
                  {item.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        className={`timeline-ledger__link${link.secondary ? " timeline-ledger__link--secondary" : ""}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        className={`timeline-ledger__link${link.secondary ? " timeline-ledger__link--secondary" : ""}`}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

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
        description="The project archive connects these client systems, student engineering projects, competitions, and training environments to software I have designed and shipped."
        links={[
          { href: "/projects", label: "Explore projects" },
          { href: "/contact", label: "Start a conversation" },
        ]}
      />

      <SectionDock
        items={[
          { id: "overview", label: "Overview" },
          { id: "work", label: "Experience" },
          { id: "competitions", label: "Competitions" },
          { id: "credentials", label: "Certifications" },
        ]}
      />
    </>
  );
}
