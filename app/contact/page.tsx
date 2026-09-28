import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionDock } from "@/components/SectionDock";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Contact Ryle Anthony Gabotero about software engineering opportunities and collaborations.",
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <header className="page-intro" id="contact">
        <h1>Contact</h1>
        <p className="page-intro__lede">
          Have a question, an opportunity, or want to collaborate? Feel free to reach out directly or send a message below.
        </p>
      </header>

      <section className="content-section contact-section" id="contact-form" aria-labelledby="contact-heading">
        <div className="contact-card">
          <div className="contact-info">
            <h2 id="contact-heading">Direct Channels</h2>
            <p className="contact-text">
              You can email me directly or find me on these platforms. I typically respond within 24 to 48 hours.
            </p>

            <div className="contact-direct-channels">
              <a href={`mailto:${siteConfig.email}`} className="contact-direct-item">
                <span className="contact-direct-label">Email</span>
                <span className="contact-direct-value">{siteConfig.email}</span>
              </a>
              <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="contact-direct-item">
                <span className="contact-direct-label">Telegram</span>
                <span className="contact-direct-value">@ryleanthony ↗</span>
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="contact-direct-item">
                <span className="contact-direct-label">LinkedIn</span>
                <span className="contact-direct-value">rylegabotero ↗</span>
              </a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="contact-direct-item">
                <span className="contact-direct-label">GitHub</span>
                <span className="contact-direct-value">Dev-RyleR6 ↗</span>
              </a>
            </div>

            <div className="contact-meta-note">
              <p>
                Based in <strong>Negros Island Region, Philippines</strong> (UTC+8).
                <br />
                Available for local and remote opportunities.
              </p>
            </div>
          </div>

          <div className="contact-form-pane">
            <ContactForm />
          </div>
        </div>
      </section>

      <SectionDock items={[{ id: "contact", label: "Contact" }]} />
    </>
  );
}
