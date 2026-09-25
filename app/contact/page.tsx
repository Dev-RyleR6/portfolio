import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ContactForm } from "@/components/ContactForm";
import { SectionDock } from "@/components/SectionDock";
import { SiteShell } from "@/components/SiteShell";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Contact", "Contact Ryle Anthony Gabotero about software engineering roles, security research, and technical collaborations.", "/contact");

export default function ContactPage() {
  return (
    <>
      <SiteShell>
        <header className="page-intro" id="hello"><p className="page-intro__kicker">Contact</p><h1>Let’s build something resilient.</h1><p className="page-intro__lede">I’m open to software engineering opportunities, security research, technical collaborations, and thoughtful conversations about systems and applied AI.</p></header>

        <section className="content-section" id="channels" aria-labelledby="channels-title">
          <div className="section-heading--split"><div><p className="eyebrow">Direct channels</p><h2 id="channels-title">Choose what works for you</h2></div><p>Email is best for detailed inquiries. For code, work history, and ongoing technical activity, you can also find me on GitHub, GitLab, and LinkedIn.</p></div>
          <div className="summary-grid">
            <a className="summary-card summary-card--link" href={`mailto:${siteConfig.email}`}><p className="summary-card__label">Email</p><h3>Send a direct message ↗</h3><p>{siteConfig.email}</p></a>
            <a className="summary-card summary-card--link" href={siteConfig.github} target="_blank" rel="noopener noreferrer"><p className="summary-card__label">GitHub</p><h3>Explore repositories ↗</h3><p>Source code and current engineering work.</p></a>
            <a className="summary-card summary-card--link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><p className="summary-card__label">LinkedIn</p><h3>Connect professionally ↗</h3><p>Experience, education, and professional updates.</p></a>
          </div>
        </section>

        <section className="content-section contact-section" id="message" aria-labelledby="message-title">
          <div className="section-heading--split"><div><p className="eyebrow">Project inquiry</p><h2 id="message-title">Tell me what you’re working on</h2></div><p>A short note about the problem, timeline, and the kind of help you need is enough to start. I’ll reply by email.</p></div>
          <div className="contact-card">
            <div className="contact-info"><p className="contact-text"><strong>Good topics to include</strong></p><ul className="contact-brief-list"><li>The problem or opportunity</li><li>Your expected timeline</li><li>Relevant technical constraints</li><li>The outcome you want to reach</li></ul><p className="contact-text">Prefer your own mail app? <a href={`mailto:${siteConfig.email}`}>Email me directly</a>.</p></div>
            <ContactForm />
          </div>
        </section>

        <section className="content-section" id="profiles" aria-labelledby="profiles-title">
          <div className="section-heading--split"><div><p className="eyebrow">Elsewhere</p><h2 id="profiles-title">More technical profiles</h2></div><p>GitLab includes additional repository activity, while the project and experience pages provide a curated view of the work and its outcomes.</p></div>
          <div className="profile-actions"><a className="action-chip" href={siteConfig.gitlab} target="_blank" rel="noopener noreferrer">GitLab ↗</a><Link className="action-chip" href="/projects">Project case studies →</Link><Link className="action-chip" href="/experience">Experience record →</Link></div>
        </section>
      </SiteShell>
      <SectionDock items={[{ id: "hello", label: "Hello" }, { id: "channels", label: "Channels" }, { id: "message", label: "Message" }, { id: "profiles", label: "Profiles" }]} />
      <Script src="https://web3forms.com/client/script.js" strategy="afterInteractive" />
    </>
  );
}
