import type { ReactNode } from "react";
import { PageTabs } from "@/components/PageTabs";
import { ProfileHeader } from "@/components/ProfileHeader";
import { VisitorStatus } from "@/components/VisitorStatus";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main className="page" id="main-content">
        <ProfileHeader />
        <PageTabs />
        {children}
        <footer className="site-footer">
          <VisitorStatus />
          <p>© 2025 Ryle Anthony Gabotero. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
