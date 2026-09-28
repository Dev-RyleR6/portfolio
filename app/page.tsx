import type { Metadata } from "next";
import Link from "next/link";
import { SectionDock } from "@/components/SectionDock";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description:
    "Software engineer based in Negros Island Region, Philippines, specializing in backend systems, cybersecurity, applied AI, and real-time architectures.",
  alternates: { canonical: "/" },
};

const focusAreas = [
  { area: "Systems", title: "Backend systems & real-time workflows", description: "APIs, streaming proxies, transactional data models, WebSocket flows, and caching designed around clear system boundaries." },
  { area: "Security", title: "Security-aware engineering", description: "Packet analysis, protocol inspection, Linux and Windows Server hardening, and threat modeling used to surface failure modes early." },
  { area: "Intelligence", title: "Applied AI & data pipelines", description: "ETL, computer vision, model evaluation, and low-latency local inference shaped around a defined product need." },
] as const;

const toolGroups = [
  { tier: "Core", title: "Backend & data", description: "Services, relational storage, caching, and live communication.", tools: ["Node.js", "TypeScript", "Express", "Laravel", "CodeIgniter", "PostgreSQL", "MySQL", "Redis", "WebSockets"] },
  { tier: "Defense", title: "Security & networking", description: "Offensive and defensive workflows, network visibility, protocol analysis, and system hardening.", tools: ["Wireshark", "Scapy", "TCP/IP & TLS", "Networking", "Offensive Security", "Defensive Security", "Linux Security", "Threat Modeling", "Firewall Configuration", "System Administration"] },
  { tier: "Models", title: "Applied AI", description: "Data preparation, computer vision, model training, and inference.", tools: ["Python", "TensorFlow", "YOLOv8", "Pandas", "NumPy", "Scikit-learn"] },
  { tier: "Delivery", title: "Frontend, delivery & infrastructure", description: "Responsive interfaces, component styling, containerized development, automated delivery, and shipping.", tools: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Kotlin", "Unity", "ARCore", "Vercel", "Git", "Docker", "GitHub Actions", "CI/CD"] },
  { tier: "Workflow", title: "AI development harnesses", description: "AI-assisted research, implementation, refactoring, testing, and review.", tools: ["Codex", "Cursor", "Antigravity", "GitHub Copilot", "OpenCode"] },
];

const proofLinks = [
  { label: "Case studies", title: "Architecture, constraints, and tradeoffs", description: "Explore selected products with implementation detail, technology choices, source links, and demos where available.", href: "/projects" },
  { label: "Experience", title: "Competition and training record", description: "Review WorldSkills participation, technical programs, assessments, and documented results.", href: "/experience" },
  { label: "Evidence", title: "Certificates and activity records", description: "Browse the supporting material behind credentials, events, and technical activities.", href: "/gallery" },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
        <section className="content-section" id="focus" aria-labelledby="focus-title">
          <div className="section-heading--split profile-section-heading">
            <h2 id="focus-title">A little about me and what I do</h2>
            <p>Hi, I’m Ryle. I’m a software engineer who likes building things that solve real problems. Most of my work involves backend development, cybersecurity, and applied AI. I now integrate AI as part of my workflow to speed up research, implementation, debugging, refactoring, and testing, while still making the architecture, security, and final implementation decisions myself. I enjoy figuring out how things work, solving technical problems, and turning ideas into software that’s actually useful.</p>
          </div>
          <div className="focus-ledger">
            {focusAreas.map((item) => (
              <article className="focus-ledger__row" key={item.area}>
                <p className="focus-ledger__label">{item.area}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="stack" aria-labelledby="stack-title">
          <div className="section-heading--split profile-section-heading">
            <h2 id="stack-title">Tools I’ve worked with</h2>
            <p>These are the tools I’ve used throughout my development across backend systems, responsive interfaces, cybersecurity, networking, applied AI, containers, and CI/CD. Each group shows where the tools fit in my workflow.</p>
          </div>
          <div className="toolkit-matrix">
            {toolGroups.map((group) => {
              const primaryTools = group.tools.slice(0, 4);
              const additionalTools = group.tools.slice(4);

              return (
                <article className="toolkit-row" key={group.title}>
                  <p className="toolkit-row__label">{group.tier}</p>
                  <div className="toolkit-row__copy">
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="toolkit-row__inventory">
                    <ul className="toolkit-row__tools" aria-label={`${group.title} primary technologies`}>
                      {primaryTools.map((tool) => <li key={tool}>{tool}</li>)}
                    </ul>
                    {additionalTools.length ? (
                      <details className="toolkit-row__more">
                        <summary>Show {additionalTools.length} more</summary>
                        <ul className="toolkit-row__tools toolkit-row__tools--more" aria-label={`${group.title} additional technologies`}>
                          {additionalTools.map((tool) => <li key={tool}>{tool}</li>)}
                        </ul>
                      </details>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section" id="proof" aria-labelledby="proof-title">
          <div className="section-heading--split profile-section-heading">
            <h2 id="proof-title">What I’ve built and achieved</h2>
            <p>My projects, competitions, certifications, and other work reflect what I’ve built and learned along the way. Explore each section for a closer look at the work behind them.</p>
          </div>
          <div className="proof-ledger">
            {proofLinks.map((item) => (
              <Link className="proof-ledger__row" href={item.href} key={item.href}>
                <span className="proof-ledger__label">{item.label}</span>
                <strong>{item.title}</strong>
                <span className="proof-ledger__description">{item.description}</span>
                <span className="proof-ledger__arrow"><ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </section>
      <SectionDock showThemeToggle items={[{ id: "intro", label: "Profile" }, { id: "focus", label: "Focus" }, { id: "stack", label: "Toolkit" }, { id: "proof", label: "Proof" }]} />
    </>
  );
}
