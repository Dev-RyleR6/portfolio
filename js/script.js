document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===========================================================================
     Context dock: section navigation and scroll position
     ========================================================================== */
  const sectionLinks = Array.from(document.querySelectorAll(".section-dock a[href^='#']"));
  const dockSections = sectionLinks
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  function setActiveSection(sectionId) {
    sectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if (dockSections.length && "IntersectionObserver" in window) {
    const visibleSections = new Map();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.boundingClientRect.top);
        else visibleSections.delete(entry.target.id);
      });

      const current = [...visibleSections.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      if (current) setActiveSection(current[0]);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: 0 });

    dockSections.forEach((section) => sectionObserver.observe(section));
  }

  if (sectionLinks.length) {
    const initial = window.location.hash.slice(1) || dockSections[0]?.id;
    if (initial) setActiveSection(initial);
  }

  /* ==========================================================================
     Theme Toggle (Dark / Light)
     ========================================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function getEffectiveTheme() {
    const currentAttr = document.documentElement.getAttribute("data-theme");
    if (currentAttr === "dark" || currentAttr === "light") return currentAttr;
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme, persist = false) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      localStorage.setItem("portfolio-theme", theme);
    }
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#0d0f11" : "#f7f7f5");
    }
    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  if (themeToggle) {
    const initialTheme = getEffectiveTheme();
    applyTheme(initialTheme, false);

    themeToggle.addEventListener("click", () => {
      const current = getEffectiveTheme();
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("portfolio-theme")) {
      applyTheme(e.matches ? "dark" : "light", false);
    }
  });

  /* ==========================================================================
     Reveal on Scroll Animation
     ========================================================================== */
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view", "is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    document
      .querySelectorAll(".portfolio-item, .achievement-card, .credential-card, .pillar-card, .service-card")
      .forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
      });
  }

  /* ==========================================================================
     Archive Page Project Filters (projects.html)
     ========================================================================== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".portfolio-item[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });

      projects.forEach((project) => {
        const categories = (project.dataset.category || "").split(/\s+/);
        const visible = filter === "all" || categories.includes(filter);
        project.classList.toggle("project-hidden", !visible);
      });
    });
  });

  /* ==========================================================================
     Slideshow Carousels
     ========================================================================== */
  const slideshows = Array.from(document.querySelectorAll("[data-slideshow]"));

  if (!reducedMotion && slideshows.length) {
    const controllers = slideshows.map((slideshow, slideshowIndex) => {
      const slides = Array.from(slideshow.querySelectorAll(":scope > img"));
      const dots = Array.from(slideshow.querySelectorAll(".slideshow-dots i"));
      const interactionTarget = slideshow.closest("a, button") || slideshow;
      let current = 0;
      let timer = null;
      let pausedByInteraction = false;

      const show = (next) => {
        current = (next + slides.length) % slides.length;
        slides.forEach((slide, index) => {
          const active = index === current;
          slide.classList.toggle("is-active", active);
          slide.setAttribute("aria-hidden", String(!active));
        });
        dots.forEach((dot, index) => dot.classList.toggle("is-active", index === current));
        const activeSlide = slides[current];
        if (activeSlide && interactionTarget && interactionTarget.hasAttribute("data-full-src")) {
          const fullSrc = activeSlide.dataset.fullSrc || activeSlide.currentSrc || activeSlide.src;
          if (fullSrc) interactionTarget.setAttribute("data-full-src", fullSrc);
          if (activeSlide.alt) interactionTarget.setAttribute("data-caption", activeSlide.alt);
        }
      };

      const stop = () => {
        if (timer === null) return;
        window.clearInterval(timer);
        timer = null;
      };

      const start = () => {
        if (timer !== null || slides.length < 2 || pausedByInteraction || document.hidden) return;
        timer = window.setInterval(() => show(current + 1), 4300 + slideshowIndex * 180);
      };

      interactionTarget.addEventListener("mouseenter", () => {
        pausedByInteraction = true;
        stop();
      });
      interactionTarget.addEventListener("mouseleave", () => {
        pausedByInteraction = false;
        start();
      });
      interactionTarget.addEventListener("focusin", () => {
        pausedByInteraction = true;
        stop();
      });
      interactionTarget.addEventListener("focusout", () => {
        pausedByInteraction = false;
        start();
      });

      show(0);
      start();
      return { start, stop };
    });

    document.addEventListener("visibilitychange", () => {
      controllers.forEach((controller) => {
        if (document.hidden) controller.stop();
        else controller.start();
      });
    });
  }
});
