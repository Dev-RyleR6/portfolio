import Image from "next/image";
import { siteConfig } from "@/lib/site";
import VectorWordmark from "@/components/originkit/ui/vector-wordmark";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";

export function ProfileHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="profile-header shared-profile-header" id={home ? "intro" : undefined}>
      <div className="profile-cover-container">
        <VectorWordmark
          text="dev_R6"
          font={{
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: "110px",
            lineHeight: "1em",
            letterSpacing: "-0.02em",
            textAlign: "left",
          }}
          style={{ minWidth: "100%", minHeight: "100%" }}
        />
      </div>
      <div className="profile-intro-block">
        <div className="profile-avatar-row">
          <AvatarLabelGroup
            size="md"
            src="/assets/images/profile.jpg"
            alt={siteConfig.name}
            title={siteConfig.name}
            subtitle="Software engineer"
            titleAs={home ? "h1" : "p"}
            priority
          />
        </div>
        <div className="profile-identity">
          <p className="profile-headline">I build reliable fullstack systems, security tools, and applied AI products.</p>
          <div className="profile-meta">
            <span className="profile-meta-item">Negros Island Region, Philippines</span>
            <span className="profile-meta-separator" aria-hidden="true">·</span>
            <span className="profile-meta-item">Foundation University</span>
          </div>
          <nav className="profile-actions profile-social-links" aria-label="Professional profiles">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/github-mark.svg" width={16} height={16} alt="" />GitHub</a>
            <a href={siteConfig.gitlab} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/gitlab.svg" width={16} height={16} alt="" />GitLab</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/InBug-Black.png" width={16} height={16} alt="" />LinkedIn</a>
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="profile-social-link"><Image src="/assets/icons/telegram.svg" width={16} height={16} alt="" />Telegram</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
