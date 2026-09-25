"use client";

import { useEffect, useId, useRef, useState } from "react";

export type DockItem = { id: string; label: string };

type SectionDockProps = {
  items: DockItem[];
  label?: string;
  activeId?: string;
  onItemSelect?: (id: string) => void;
};

export function SectionDock({ items, label = "Sections on this page", activeId, onItemSelect }: SectionDockProps) {
  const [observedActive, setObservedActive] = useState(items[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dockRef = useRef<HTMLElement>(null);
  const wasVisibleRef = useRef(false);
  const panelId = useId();
  const active = activeId ?? observedActive;
  const activeLabel = items.find(({ id }) => id === active)?.label ?? items[0]?.label ?? "Overview";
  const isOpen = isVisible && !isCollapsed;

  useEffect(() => {
    if (onItemSelect) return;

    const sections = items.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });
      const current = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      if (current) setObservedActive(current[0]);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items, onItemSelect]);

  useEffect(() => {
    let animationFrame = 0;
    let revealThreshold = window.innerHeight;

    const measureRevealThreshold = () => {
      const pageTabs = document.querySelector<HTMLElement>(".site-tabs");
      revealThreshold = pageTabs ? pageTabs.offsetTop + pageTabs.offsetHeight : window.innerHeight;
    };

    const updateVisibility = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const nextVisible = window.scrollY > revealThreshold;

        if (nextVisible && !wasVisibleRef.current) setIsCollapsed(false);
        wasVisibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      });
    };

    const handleResize = () => {
      measureRevealThreshold();
      updateVisibility();
    };

    measureRevealThreshold();
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCollapsed(true);
        dockRef.current?.querySelector<HTMLButtonElement>(".section-dock__trigger")?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <nav
      className={`section-dock${isVisible ? " is-visible" : ""}${isOpen ? " is-open" : ""}`}
      aria-label={label}
      aria-hidden={!isVisible}
      ref={dockRef}
    >
      <button
        className="section-dock__trigger"
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={
          onItemSelect
            ? isOpen
              ? "Collapse filter options"
              : `Filter projects. Active filter: ${activeLabel}`
            : isOpen
              ? "Collapse page sections"
              : `Expand page sections. Current section: ${activeLabel}`
        }
        tabIndex={isVisible ? undefined : -1}
        onClick={() => setIsCollapsed((current) => !current)}
      >
        {onItemSelect ? (
          <svg className="section-dock__symbol" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor">
            <path d="M2.5 4.5h13M4.5 9h9M7 13.5h4" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="section-dock__symbol" viewBox="0 0 18 18" aria-hidden="true">
            <circle cx="3" cy="4" r="1" />
            <circle cx="3" cy="9" r="1" />
            <circle cx="3" cy="14" r="1" />
            <path d="M6 4h9M6 9h9M6 14h9" />
          </svg>
        )}
        <span className="section-dock__current">
          <span>{isOpen ? (onItemSelect ? "Filter" : "Navigation") : (onItemSelect ? "Category" : "Sections")}</span>
          <strong>{isOpen ? "Collapse" : activeLabel}</strong>
        </span>
        <svg className="section-dock__chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m4.5 6 3.5 3.5L11.5 6" />
        </svg>
      </button>

      <div className="section-dock__panel" id={panelId} aria-hidden={!isOpen}>
        <div className="section-dock__links">
          {items.map(({ id, label: itemLabel }) => (
            onItemSelect ? (
              <button
                type="button"
                className={active === id ? "active" : undefined}
                aria-pressed={active === id}
                tabIndex={isOpen ? undefined : -1}
                onClick={() => {
                  onItemSelect(id);
                  const overview = document.getElementById("overview");
                  if (overview && window.scrollY > overview.offsetTop) {
                    overview.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                key={id}
              >
                {itemLabel}
              </button>
            ) : (
              <a
                href={`#${id}`}
                className={active === id ? "active" : undefined}
                aria-current={active === id ? "location" : undefined}
                tabIndex={isOpen ? undefined : -1}
                onClick={() => setObservedActive(id)}
                key={id}
              >
                {itemLabel}
              </a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
