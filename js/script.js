document.addEventListener("DOMContentLoaded", () => {
  const navButtons = Array.from(document.querySelectorAll(".nav-button[href^='#']"));
  const subNavLinks = Array.from(document.querySelectorAll(".subnav-link[href^='#']"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateActiveNav() {
    const allNavItems = [...navButtons, ...subNavLinks];
    if (!allNavItems.length) return;

    const targets = Array.from(
      new Set(
        allNavItems
          .map((item) => document.querySelector(item.getAttribute("href")))
          .filter(Boolean)
      )
    );
    if (!targets.length) return;

    const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 260);
    let current = targets[0].id;

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      current = targets[targets.length - 1].id;
    } else {
      for (const section of targets) {
        const top = Math.round(section.getBoundingClientRect().top + window.scrollY);
        if (marker >= top) current = section.id;
      }
    }

    navButtons.forEach((button) => {
      const active = button.getAttribute("href") === `#${current}`;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "location");
      else button.removeAttribute("aria-current");
    });

    subNavLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        updateActiveNav();
        scrollTicking = false;
      });
    },
    { passive: true }
  );
  updateActiveNav();

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
      .querySelectorAll(".section, .hero, .portfolio-item, .achievement-card, .credential-card, .pillar-card, .service-card")
      .forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
      });
  }

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
