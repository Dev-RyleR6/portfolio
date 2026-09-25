"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const pages = [
  ["/", "Profile"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
] as const;

export function PageTabs() {
  const pathname = usePathname();
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = linksRef.current;
    const activeTab = links?.querySelector<HTMLElement>('[aria-current="page"]');

    if (!links || !activeTab) return;

    links.scrollLeft = Math.max(
      0,
      activeTab.offsetLeft - (links.clientWidth - activeTab.clientWidth) / 2,
    );
  }, [pathname]);

  return (
    <nav className="site-tabs" aria-label="Portfolio pages">
      <div className="site-tabs__inner">
        <div className="site-tabs__links" ref={linksRef}>
          {pages.map(([href, label]) => (
            <Link className="site-tab" href={href} aria-current={pathname === href ? "page" : undefined} key={href}>
              {label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
