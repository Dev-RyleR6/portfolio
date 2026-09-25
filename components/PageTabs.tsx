"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <nav className="site-tabs" aria-label="Portfolio pages">
      <div className="site-tabs__inner">
        <div className="site-tabs__links">
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
