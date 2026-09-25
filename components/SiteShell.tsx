import type { ReactNode } from "react";
import { PageTabs } from "@/components/PageTabs";
import { ProfileHeader } from "@/components/ProfileHeader";

export function SiteShell({ children, home = false }: { children: ReactNode; home?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main className="page" id="main-content">
        <ProfileHeader home={home} />
        <PageTabs />
        {children}
        <footer className="site-footer"><p>© 2026 Ryle Anthony Gabotero. All rights reserved.</p></footer>
      </main>
    </>
  );
}
