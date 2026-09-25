document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================================
     Profile Tab System (About, Projects, Experience, Contact)
     ========================================================================== */
  const subnavTabs = Array.from(document.querySelectorAll(".subnav-tab[data-tab]"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
  const subnav = document.getElementById("profile-subnav");

  const tabAliases = {
    about: "about",
    profile: "about",
    projects: "projects",
    portfolio: "projects",
    experience: "experience",
    pillars: "experience",
    timeline: "experience",
    credentials: "experience",
    contact: "contact"
  };

  function switchTab(rawTabName, updateHash = true, shouldScroll = false) {
    if (!subnavTabs.length || !tabPanels.length) return;

    const normalized = (rawTabName || "").toLowerCase().replace(/^#/, "");
    const targetTab = tabAliases[normalized] || "about";

    subnavTabs.forEach((tab) => {
      const isMatch = tab.dataset.tab === targetTab;
      tab.classList.toggle("active", isMatch);
      tab.setAttribute("aria-selected", String(isMatch));
      if (isMatch) {
        tab.removeAttribute("tabindex");
      } else {
        tab.setAttribute("tabindex", "-1");
      }
    });

    tabPanels.forEach((panel) => {
      const isMatch = panel.id === `tab-${targetTab}`;
      if (isMatch) {
        panel.removeAttribute("hidden");
        panel.classList.add("is-active");
      } else {
        panel.setAttribute("hidden", "");
        panel.classList.remove("is-active");
      }
    });

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${targetTab}`);
    }

    if (shouldScroll && subnav) {
      const navRect = subnav.getBoundingClientRect();
      if (navRect.top < 0) {
        subnav.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      }
    }

    // Ensure newly visible elements are revealed
    if ("IntersectionObserver" in window) {
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.querySelectorAll(".reveal").forEach((el) => {
          el.classList.add("in-view", "is-visible");
        });
      }
    }
  }

  // Click handlers on tab buttons
  subnavTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab, true, true);
    });
  });

  // Keyboard navigation for tablist (W3C APG Tabs Pattern)
  const tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    tablist.addEventListener("keydown", (e) => {
      const tabs = subnavTabs;
      const index = tabs.indexOf(document.activeElement);
      if (index === -1) return;

      let nextIndex = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabs[nextIndex].focus();
        switchTab(tabs[nextIndex].dataset.tab, true, false);
      }
    });
  }

  // Intercept any internal links targeting tabs (e.g. data-tab-target or href="#contact")
  document.addEventListener("click", (e) => {
    const targetEl = e.target.closest("[data-tab-target]");
    if (targetEl) {
      e.preventDefault();
      const tabName = targetEl.getAttribute("data-tab-target");
      switchTab(tabName, true, true);
      return;
    }

    const anchor = e.target.closest("a[href^='#']");
    if (anchor && !anchor.classList.contains("subnav-tab")) {
      const href = anchor.getAttribute("href");
      const cleanHref = href.slice(1);
      if (tabAliases[cleanHref]) {
        e.preventDefault();
        switchTab(cleanHref, true, true);
      }
    }
  });

  // Handle URL hash on initial page load and hash changes
  function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash && tabAliases[hash]) {
      switchTab(hash, false, false);
    } else {
      switchTab("about", false, false);
    }
  }

  window.addEventListener("hashchange", handleHash);
  handleHash();

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
