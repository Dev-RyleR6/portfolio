"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const pages = [
  ["/", "Profile"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
] as const;

type IndicatorSnapshot = {
  pathname: string;
  left: number;
  width: number;
};

export function PageTabs() {
  const pathname = usePathname();
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const previousIndicatorRef = useRef<IndicatorSnapshot | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const pendingScrollRef = useRef<string | null>(null);

  function captureIndicator() {
    const indicator = indicatorRef.current;

    if (!indicator) return;

    const current = indicator.getBoundingClientRect();
    previousIndicatorRef.current = {
      pathname,
      left: current.left,
      width: current.width,
    };
  }

  const scrollToRouteStart = useCallback((href: string) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    const tabs = linksRef.current?.closest<HTMLElement>(".site-tabs");

    if (!tabs) return;

    const header = tabs.previousElementSibling;
    const marginTop = Number.parseFloat(window.getComputedStyle(tabs).marginTop) || 0;
    const top = header instanceof HTMLElement
      ? header.getBoundingClientRect().bottom + window.scrollY + marginTop
      : 0;

    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, []);

  function selectTab(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    captureIndicator();

    if (href === pathname) {
      event.preventDefault();
      scrollToRouteStart(href);
      return;
    }

    pendingScrollRef.current = href;
  }

  useLayoutEffect(() => {
    const links = linksRef.current;
    const activeTab = links?.querySelector<HTMLElement>('[aria-current="page"]');
    const indicator = indicatorRef.current;

    if (!links || !activeTab || !indicator) return;

    links.scrollLeft = Math.max(
      0,
      activeTab.offsetLeft - (links.clientWidth - activeTab.clientWidth) / 2,
    );

    const target = indicator.getBoundingClientRect();
    const from = previousIndicatorRef.current;

    animationRef.current?.cancel();

    if (
      from &&
      from.pathname !== pathname &&
      from.width > 0 &&
      target.width > 0 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animationRef.current = indicator.animate(
        [
          {
            transform: `translateX(${from.left - target.left}px) scaleX(${from.width / target.width})`,
            transformOrigin: "left center",
          },
          { transform: "translateX(0) scaleX(1)", transformOrigin: "left center" },
        ],
        { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }

    previousIndicatorRef.current = {
      pathname,
      left: target.left,
      width: target.width,
    };
  }, [pathname]);

  useEffect(() => {
    if (pendingScrollRef.current !== pathname) return;

    pendingScrollRef.current = null;
    const animationFrame = requestAnimationFrame(() => scrollToRouteStart(pathname));

    return () => cancelAnimationFrame(animationFrame);
  }, [pathname, scrollToRouteStart]);

  return (
    <nav className="site-tabs" aria-label="Portfolio pages">
      <div className="site-tabs__inner">
        <div className="site-tabs__links" ref={linksRef}>
          {pages.map(([href, label]) => (
            <Link className="site-tab" href={href} scroll={false} onClick={(event) => selectTab(event, href)} aria-current={pathname === href ? "page" : undefined} key={href}>
              {label}
              {pathname === href ? <span className="site-tab__indicator" ref={indicatorRef} aria-hidden="true" /> : null}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
