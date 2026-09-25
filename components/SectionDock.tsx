"use client";

import { useEffect, useState } from "react";

export type DockItem = { id: string; label: string };

export function SectionDock({ items, label = "Sections on this page" }: { items: DockItem[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });
      const current = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      if (current) setActive(current[0]);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="section-dock" aria-label={label}>
      {items.map(({ id, label: itemLabel }) => (
        <a href={`#${id}`} className={active === id ? "active" : undefined} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)} key={id}>
          {itemLabel}
        </a>
      ))}
    </nav>
  );
}
