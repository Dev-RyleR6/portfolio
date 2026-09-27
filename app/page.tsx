import type { Metadata } from "next";
import Link from "next/link";
import { SectionDock } from "@/components/SectionDock";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const focusAreas = [
  ["01 · Systems", "Backend & distributed architecture", "Streaming proxies, transactional data models, WebSocket workflows, caching, and resilient APIs."],
  ["02 · Security", "Cybersecurity & resilience", "Packet analysis, protocol inspection, Linux hardening, threat modeling, and incident response."],
  ["03 · Intelligence", "Applied AI & data engineering", "ETL pipelines, computer vision, semantic models, evaluation, and low-latency local inference."],
] as const;

const toolGroups = [
  { tier: "Core", title: "Backend systems", description: "Runtime, data, caching, and real-time communication.", tools: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MySQL", "Redis", "WebSockets"] },
  { tier: "Defense", title: "Security", description: "Network visibility, analysis, and system hardening.", tools: ["Wireshark", "Scapy", "TCP/IP & TLS", "Linux Security", "Threat Modeling"] },
  { tier: "Models", title: "AI & data", description: "Data preparation, model training, and inference.", tools: ["Python", "TensorFlow", "YOLOv8", "Pandas", "NumPy", "Scikit-learn"] },
  { tier: "Delivery", title: "Product platforms", description: "Interfaces, mobile experiences, infrastructure, and shipping.", tools: ["React", "Kotlin", "Unity", "ARCore", "Docker", "GitHub CI"] },
];

export default function HomePage() {
  return (
    <>
        <section className="content-section" id="focus" aria-labelledby="focus-title">
          <div className="section-heading--split">
            <div><p className="eyebrow">Engineering focus</p><h2 id="focus-title">Systems that stay clear under complexity</h2></div>
            <p>I work across the layers where reliability matters most: APIs, data flows, network behavior, local inference, and the interfaces that make those systems understandable. My goal is simple—turn difficult technical problems into products people can trust.</p>
          </div>
          <div className="summary-grid">
            {focusAreas.map(([label, title, description]) => <article className="summary-card" key={label}><p className="summary-card__label">{label}</p><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </section>

        <section className="content-section" id="stack" aria-labelledby="stack-title">
          <div className="section-heading--split">
            <div><p className="eyebrow">Technical toolkit</p><h2 id="stack-title">Organized by the job each tool does</h2></div>
            <p>The stack is grouped by capability so it is easier to see how the pieces connect, instead of presenting one long list of technologies.</p>
          </div>
          <div className="tech-card"><div className="tech-tier-grid">
            {toolGroups.map((group) => (
              <div className="tech-group" key={group.title}>
                <div className="tech-group-header"><span className="tech-tier-pill">{group.tier}</span><h3 className="tech-group-title">{group.title}</h3></div>
                <p className="tech-group-desc">{group.description}</p>
                <div className="tech-tags">{group.tools.map((tool) => <span className="tech-tag" key={tool}>{tool}</span>)}</div>
              </div>
            ))}
          </div></div>
        </section>

        <section className="content-section" id="proof" aria-labelledby="proof-title">
          <div className="section-heading--split">
            <div><p className="eyebrow">Proof of practice</p><h2 id="proof-title">Built, tested, and evaluated</h2></div>
            <p>My work includes production-minded personal systems, a regional cybersecurity gold medal, national WorldSkills representation, and assessed AI training. Explore the technical decisions and evidence behind those outcomes.</p>
          </div>
          <div className="summary-grid">
            <Link className="summary-card summary-card--link" href="/projects"><p className="summary-card__label">Case studies</p><h3>Five engineered products →</h3><p>Architecture, constraints, stack, and links for each project.</p></Link>
            <Link className="summary-card summary-card--link" href="/experience"><p className="summary-card__label">Experience</p><h3>Competitions & credentials →</h3><p>WorldSkills, technical programs, assessments, and results.</p></Link>
            <Link className="summary-card summary-card--link" href="/gallery"><p className="summary-card__label">Evidence</p><h3>Activity gallery →</h3><p>Photos, certificates, and supporting event records.</p></Link>
          </div>
        </section>
      <SectionDock items={[{ id: "intro", label: "Profile" }, { id: "focus", label: "Focus" }, { id: "stack", label: "Toolkit" }, { id: "proof", label: "Proof" }]} />
    </>
  );
}
