import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionDock } from "@/components/SectionDock";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Experience & Credentials", "National and regional cybersecurity competitions, technical training, and formal assessments earned by Ryle Anthony Gabotero.", "/experience");

const pillars = [
  { index: "01", badge: "Distributed systems", title: "Backend architecture", description: "High-throughput APIs, streaming reverse proxies, connection pooling, Redis caching, relational schemas, and real-time workflows built around reliability and data integrity.", tags: ["REST APIs", "WebSockets", "PostgreSQL", "Redis"] },
  { index: "02", badge: "Security & resilience", title: "Cybersecurity", description: "Network inspection, protocol analysis, attack-surface reduction, Linux hardening, and incident response practiced in timed competition environments.", tags: ["Packet analysis", "Wireshark", "Threat modeling", "Linux"] },
  { index: "03", badge: "Machine learning", title: "Applied AI & data", description: "Multi-stage ETL, feature engineering, neural network architecture, model evaluation, computer vision, and low-latency inference endpoints.", tags: ["TensorFlow", "YOLOv8", "Data pipelines", "Model validation"] },
];

const compactAchievements = [
  { date: "November 2025", datetime: "2025-11", meta: "APAC finalist", title: "Huawei Developer Competition", role: "Cloud & AI", description: "Built and presented a cloud-native intelligent solution through Huawei’s Asia-Pacific developer competition program.", href: "/gallery#huawei", link: "View certificate" },
  { date: "July 2025", datetime: "2025-07", meta: "4th place · Top 5", title: "Can You HackIT: The IBPAP Challenge", role: "Developer · Team SHIFT", description: "Architected and presented a working solution within 24 hours at Cebu Institute of Technology–University.", href: "/gallery#hackit", link: "View event gallery" },
  { date: "June 2024", datetime: "2024-06", meta: "Innovation participant", title: "DICT AI.deas for Impact", role: "AI for social impact", description: "Developed and pitched AI concepts addressing regional challenges during the DICT innovation workshop.", href: "/gallery#aideas", link: "View workshop gallery" },
];

export default function ExperiencePage() {
  return (
    <>
        <header className="page-intro page-intro--experience" id="overview">
          <div className="experience-intro__heading">
            <p className="page-intro__kicker">Experience & credentials</p>
            <h1>Practice tested beyond the classroom.</h1>
          </div>
          <div className="experience-intro__details">
            <p className="page-intro__lede">National and regional competition experience, intensive technical programs, and formal assessments—organized by what I practiced, achieved, and validated.</p>
            <a className="resume-entry" href={siteConfig.resume} target="_blank" rel="noopener noreferrer">
              <svg className="resume-entry__document" aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M6.75 3.25h7.5l3 3v14.5H6.75z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14.25 3.25v3h3M9.5 11h5M9.5 14.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="resume-entry__copy">
                <strong>Résumé</strong>
                <span>Experience, skills, and credentials · PDF</span>
              </span>
              <span className="resume-entry__open">
                Open PDF
                <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                  <path d="M4 14 14 4M7 4h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </header>

        <section className="content-section" id="pillars" aria-labelledby="pillars-title">
          <div className="section-heading--split"><div><p className="eyebrow">Capabilities</p><h2 id="pillars-title">Three connected engineering pillars</h2></div><p>Backend fundamentals make data systems dependable, security thinking exposes failure modes, and applied AI turns well-structured data into useful decisions.</p></div>
          <div className="services-grid pillars-grid">
            {pillars.map((pillar) => <article className="service-card pillar-card" key={pillar.index}><p className="service-index pillar-index">{pillar.index}</p><span className="pillar-badge">{pillar.badge}</span><h3 className="service-title pillar-title">{pillar.title}</h3><p className="service-description pillar-description">{pillar.description}</p><div className="pillar-tags">{pillar.tags.map((tag) => <span className="pillar-tag" key={tag}>{tag}</span>)}</div></article>)}
          </div>
        </section>

        <section className="content-section" id="competitions" aria-labelledby="competitions-title">
          <div className="section-heading--split"><div><p className="eyebrow">Competition record</p><h2 id="competitions-title">Results under real constraints</h2></div><p>A chronological record of skills competitions and hackathons evaluated under time pressure, technical requirements, and live presentation conditions.</p></div>
          <div className="achievement-list">
            <article className="achievement-card achievement-card--featured">
              <div className="achievement-copy"><div className="achievement-meta"><time dateTime="2026-09">September 2026</time><span>National competitor</span></div><h3>WorldSkills Philippines Clark 2026</h3><p className="achievement-role">Cybersecurity · Team NIR</p><p>Represented the Negros Island Region at the national skills competition, defending network infrastructure and completing incident-response tasks in a timed environment.</p><div className="achievement-actions"><Link className="text-link" href="/gallery#worldskills-national">View event gallery →</Link><a className="text-link text-link--secondary" href="https://tesda.gov.ph/Media/NewsDetail/20489" target="_blank" rel="noopener noreferrer">TESDA record ↗</a></div></div>
              <figure className="achievement-media"><Image src="/assets/images/worldskills/nationals/8d9c0df7-8dbb-4809-a3c0-072189056fb9.jpg" width={2048} height={1536} loading="lazy" alt="Opening program at WorldSkills Philippines Clark 2026" /><figcaption>WorldSkills Philippines national competition</figcaption></figure>
            </article>
            <article className="achievement-card achievement-card--featured">
              <div className="achievement-copy"><div className="achievement-meta"><time dateTime="2026-06">June 2026</time><span>Regional champion</span></div><h3>NIR Regional Skills Olympics</h3><p className="achievement-role">Gold medal · Cybersecurity</p><p>Won the Cybersecurity skill area with teammate Earl John Estandarte, qualifying to represent the region at the national WorldSkills competition.</p><div className="achievement-actions"><Link className="text-link" href="/gallery#worldskills-regional">View evidence and gallery →</Link><a className="text-link text-link--secondary" href="https://www.foundationu.edu.ph/post/foundation-university-bags-gold-medals-at-the-nir-regional-skills-olympics" target="_blank" rel="noopener noreferrer">University record ↗</a></div></div>
              <figure className="achievement-media"><Image src="/assets/images/worldskills/regional/image.png" width={1920} height={1279} loading="lazy" alt="Cybersecurity gold medalists at the NIR Regional Skills Olympics" /><figcaption>Regional cybersecurity awarding ceremony</figcaption></figure>
            </article>
            {compactAchievements.map((item) => <article className="achievement-card" key={item.title}><div className="achievement-meta"><time dateTime={item.datetime}>{item.date}</time><span>{item.meta}</span></div><h3>{item.title}</h3><p className="achievement-role">{item.role}</p><p>{item.description}</p><div className="achievement-actions"><Link className="text-link" href={item.href}>{item.link} →</Link></div></article>)}
          </div>
        </section>

        <section className="content-section" id="credentials" aria-labelledby="credentials-title">
          <div className="section-heading--split"><div><p className="eyebrow">Training & assessment</p><h2 id="credentials-title">Formal validation</h2></div><p>Structured programs and assessments provide an external view of the same capabilities shown in the projects and competition record.</p></div>
          <div className="credential-grid">
            <article className="credential-card"><div className="credential-number" aria-hidden="true">01</div><p className="credential-issuer">KOICA DX Center · Hannam University · Silliman University</p><h3>Advanced Big Data Analytics & Artificial Intelligence</h3><p className="credential-meta">120 hours · June–July 2026</p><p>Seven assessed domains spanning machine learning, neural networks, TensorFlow, reinforcement learning, and autonomous AI agents.</p><p className="credential-highlight">10/10 · Deep Learning Architecture</p><Link className="text-link" href="/gallery#koica">View training evidence →</Link></article>
            <article className="credential-card"><div className="credential-number" aria-hidden="true">02</div><p className="credential-issuer">IITP · TOPCIT Philippines</p><h3>TOPCIT ICT Competency Assessment</h3><p className="credential-meta">Level 2 · 365/1000 · July 23, 2026</p><p>Standardized assessment covering software development, data management, systems architecture, cybersecurity, and IT project management.</p><a className="text-link" href="/assets/docs/My Page _ Score & Certificate _Overall achievement _ TOPCIT.pdf" target="_blank" rel="noopener noreferrer">Open score report ↗</a></article>
          </div>
        </section>
      <SectionDock items={[{ id: "overview", label: "Overview" }, { id: "pillars", label: "Capabilities" }, { id: "competitions", label: "Competitions" }, { id: "credentials", label: "Credentials" }]} />
    </>
  );
}
