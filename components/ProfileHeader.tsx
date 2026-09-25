import Image from "next/image";
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
          <nav className="profile-actions profile-social-links" aria-label="Professional profiles">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/github-mark.svg" width={16} height={16} alt="" />GitHub</a>
            <a href={siteConfig.gitlab} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/gitlab.svg" width={16} height={16} alt="" />GitLab</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/InBug-Black.png" width={16} height={16} alt="" />LinkedIn</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
