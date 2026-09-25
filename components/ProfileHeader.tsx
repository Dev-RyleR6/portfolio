import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function ProfileHeader({ home = false }: { home?: boolean }) {
  const NameTag = home ? "h1" : "p";

  return (
    <header className="profile-header shared-profile-header" id={home ? "intro" : undefined}>
      <div className="profile-cover-container">
        <Image src="/assets/images/cover.svg" width={1200} height={300} alt="Abstract technical architecture banner" className="profile-cover" priority />
      </div>
      <div className="profile-intro-block">
        <div className="profile-avatar-row">
          <div className="profile-avatar-wrapper">
            <Image src="/assets/images/profile.jpg" width={400} height={400} alt={siteConfig.name} className="profile-avatar" priority />
          </div>
        </div>
        <div className="profile-identity">
          <p className="page-intro__kicker">Software engineer</p>
          <NameTag className="profile-name">{siteConfig.name}</NameTag>
          <p className="profile-headline">I build reliable backend systems, security tools, and applied AI products.</p>
          <div className="profile-meta">
            <span className="profile-meta-item">Negros Island Region, Philippines</span>
            <span className="profile-meta-separator" aria-hidden="true">·</span>
            <span className="profile-meta-item">Foundation University</span>
          </div>
          <div className="profile-actions" aria-label="Primary actions">
            <Link href="/projects" className="action-chip action-chip--primary">Explore projects <span aria-hidden="true">→</span></Link>
            <Link href="/contact" className="action-chip">Start a conversation</Link>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="action-chip">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </header>
  );
}
