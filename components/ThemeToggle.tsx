"use client";

import { useRef, useState } from "react";

type Theme = "light" | "dark";
type ThemeTransitionDirection = "diag-down-right" | "diag-up-left";

const diagonalClipPaths: Record<ThemeTransitionDirection, [string, string]> = {
  "diag-down-right": [
    "polygon(0 0, 0 0, 0 0)",
    "polygon(0 0, 220% 0, 0 220%)",
  ],
  "diag-up-left": [
    "polygon(100% 100%, 100% 100%, 100% 100%)",
    "polygon(100% 100%, -120% 100%, 100% -120%)",
  ],
};

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const switchingRef = useRef(false);

  function applyTheme(next: Theme) {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    localStorage.setItem("portfolio-theme", next);
    setTheme(next);
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = next === "dark" ? "#000000" : "#f7f7f5";
    });
  }

  function toggleTheme() {
    if (switchingRef.current) return;

    const root = document.documentElement;
    const isDark = root.dataset.theme === "dark";
    const goingDark = !isDark;
    const next: Theme = goingDark ? "dark" : "light";
    const direction: ThemeTransitionDirection = goingDark
      ? "diag-down-right"
      : "diag-up-left";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startViewTransition = (document as ViewTransitionDocument).startViewTransition;

    if (reducedMotion) {
      applyTheme(next);
      return;
    }

    if (!startViewTransition) {
      root.classList.add("theme-transition-fallback");
      applyTheme(next);
      window.setTimeout(() => root.classList.remove("theme-transition-fallback"), 620);
      return;
    }

    switchingRef.current = true;
    root.dataset.themeTransition = direction;

    const transition = startViewTransition.call(document, () => applyTheme(next));
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: diagonalClipPaths[direction],
        },
        {
          duration: 820,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => {
      switchingRef.current = false;
      delete root.dataset.themeTransition;
    });
  }

  return (
    <button
      className={`site-theme-toggle${className ? ` ${className}` : ""}`}
      type="button"
      aria-label={theme === null ? "Toggle color theme" : theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="theme-icon-wrap" aria-hidden="true">
        <svg className="theme-icon theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M1 12h2M21 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42" />
        </svg>
        <svg className="theme-icon theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
