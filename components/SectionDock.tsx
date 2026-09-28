"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type DockItem = { id: string; label: string };

type SectionDockProps = {
  items: DockItem[];
  label?: string;
  activeId?: string;
  onItemSelect?: (id: string) => void;
};

const STORAGE_KEY = "portfolio-dock-collapsed";

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function SectionDock({
  items,
  label = "Sections on this page",
  activeId,
  onItemSelect,
}: SectionDockProps) {
  const [observedActive, setObservedActive] = useState(items[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);
  const storedCollapsed = useSyncExternalStore(
    subscribeStorage,
    getStoredCollapsed,
    getServerSnapshot,
  );
  const [collapsedOverride, setCollapsedOverride] = useState<boolean | null>(null);
  const isCollapsed = collapsedOverride ?? storedCollapsed;

  const dockRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const active = activeId ?? observedActive;
  const activeLabel =
    items.find(({ id }) => id === active)?.label ?? items[0]?.label ?? "Overview";

  const handleCollapse = useCallback(() => {
    setCollapsedOverride(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }, []);

  const handleExpand = useCallback(() => {
    setCollapsedOverride(false);
    try {
      localStorage.setItem(STORAGE_KEY, "false");
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }, []);

  // Section observer for scroll-spy
  useEffect(() => {
    if (onItemSelect) return;

    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });
        const current = [...visible.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1]),
        )[0];
        if (current) setObservedActive(current[0]);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items, onItemSelect]);

  // Reveal dock when scrolled past hero/tabs header
  useEffect(() => {
    let animationFrame = 0;
    let revealThreshold = window.innerHeight;

    const measureRevealThreshold = () => {
      const pageTabs = document.querySelector<HTMLElement>(".site-tabs");
      revealThreshold = pageTabs
        ? pageTabs.offsetTop + pageTabs.offsetHeight
        : window.innerHeight;
    };

    const updateVisibility = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const nextVisible = window.scrollY > revealThreshold;
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

  // Escape key collapses the dock and focuses the restore button
  useEffect(() => {
    if (isCollapsed || !isVisible) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
        requestAnimationFrame(() => {
          dockRef.current
            ?.querySelector<HTMLButtonElement>(".section-dock__restore")
            ?.focus();
        });
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isCollapsed, isVisible, handleCollapse]);

  return (
    <nav
      className={`section-dock${isVisible ? " is-visible" : ""}${
        isCollapsed ? " is-collapsed" : " is-expanded"
      }`}
      aria-label={label}
      aria-hidden={!isVisible}
      ref={dockRef}
    >
      {isCollapsed ? (
        <button
          type="button"
          className="section-dock__restore"
          onClick={handleExpand}
          aria-expanded={false}
          aria-controls={panelId}
          aria-label={`Open ${onItemSelect ? "filter options" : "navigation dock"}. Active: ${activeLabel}`}
          title={`Open ${onItemSelect ? "filters" : "sections"}`}
          tabIndex={isVisible ? undefined : -1}
        >
          <span className="section-dock__restore-icon" aria-hidden="true">
            <svg
              viewBox="0 0 20 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 7.5l5-5 5 5" />
            </svg>
          </span>
        </button>
      ) : (
        <div
          className="section-dock__panel"
          id={panelId}
        >
          <div className="section-dock__items">
            {items.map(({ id, label: itemLabel }) =>
              onItemSelect ? (
                <button
                  type="button"
                  className={`section-dock__btn${
                    active === id ? " is-active" : ""
                  }`}
                  aria-pressed={active === id}
                  tabIndex={isVisible ? undefined : -1}
                  onClick={() => {
                    onItemSelect(id);
                    const overview = document.getElementById("overview");
                    if (overview && window.scrollY > overview.offsetTop) {
                      overview.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  key={id}
                >
                  {itemLabel}
                </button>
              ) : (
                <a
                  href={`#${id}`}
                  className={`section-dock__btn${
                    active === id ? " is-active" : ""
                  }`}
                  aria-current={active === id ? "location" : undefined}
                  tabIndex={isVisible ? undefined : -1}
                  onClick={() => setObservedActive(id)}
                  key={id}
                >
                  {itemLabel}
                </a>
              ),
            )}
          </div>

          <button
            type="button"
            className="section-dock__collapse-action"
            onClick={handleCollapse}
            aria-label="Collapse dock"
            title="Collapse dock"
            tabIndex={isVisible ? undefined : -1}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
}
