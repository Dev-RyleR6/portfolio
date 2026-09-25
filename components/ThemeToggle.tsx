"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      next === "dark" ? "#0d0f11" : "#f7f7f5",
    );
  }

  return (
    <button
      className="site-theme-toggle"
      type="button"
      aria-label="Toggle color theme"
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
