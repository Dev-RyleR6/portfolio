import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { getSiteUrl, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Contact Ryle Anthony Gabotero about software engineering roles, cybersecurity projects, applied AI, and technical collaborations.",
  "/contact"
);

export default function ContactPage() {
  const siteUrl = getSiteUrl();
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Ryle Anthony Gabotero",
    url: `${siteUrl}/contact`,
    description:
      "Contact Ryle Anthony Gabotero about software engineering roles, cybersecurity projects, applied AI, and technical collaborations.",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      email: `mailto:${siteConfig.email}`,
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.telegram],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="page-intro page-intro--contact" id="contact">
        <h1 id="contact-title">Let’s talk about what’s next.</h1>
        <p className="page-intro__lede">
          Reach out about software engineering roles, cybersecurity projects,
          applied AI work, or technical collaborations. I usually reply within
          24 to 48 hours.
        </p>
      </header>

      <section
        className="content-section contact-section"
        id="contact-form"
        aria-labelledby="contact-title"
      >
        <div className="contact-card">
          <div className="contact-form-pane">
            <ContactForm />
          </div>

          <div className="contact-info">
            <div className="contact-info__copy">
              <h2>Prefer a direct channel?</h2>
              <p className="contact-text">
                Email me, or connect on LinkedIn or Telegram.
              </p>
            </div>

            <nav className="contact-direct-channels" aria-label="Direct contact channels">
              <a
                href={`mailto:${siteConfig.email}`}
                className="contact-direct-item"
                aria-label={`Email ${siteConfig.email}`}
                title="Email"
              >
                <Image src="/assets/icons/gmail.svg" width={18} height={18} alt="" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-item"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <Image src="/assets/icons/InBug-Black.png" width={18} height={18} alt="" />
              </a>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-item"
                aria-label="Telegram profile"
                title="Telegram"
              >
                <Image src="/assets/icons/telegram.svg" width={18} height={18} alt="" />
              </a>
            </nav>

            <div className="contact-meta-note">
              <p>
                Based in <strong>Negros Island Region, Philippines</strong> (UTC+8).
                <br />
                Available for local and remote opportunities.
              </p>
              <a
                className="contact-resume-link"
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Ryle Anthony Gabotero’s resume"
              >
                <svg className="contact-resume-link__icon" aria-hidden="true" viewBox="0 0 20 20" fill="none">
                  <path d="M5 2.75h6l4 4v10.5H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M11 2.75v4h4M7.75 10h4.5M7.75 13h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="contact-resume-link__copy">
                  <strong>Resume</strong>
                  <span>Experience, skills, and credentials.</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
