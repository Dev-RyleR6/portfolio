document.addEventListener("DOMContentLoaded", () => {
  const navButtons = Array.from(document.querySelectorAll(".nav-button[href^='#']"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateActiveNav() {
    if (!navButtons.length) return;

    const targets = navButtons
      .map((button) => document.querySelector(button.getAttribute("href")))
      .filter(Boolean);
    if (!targets.length) return;

    const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 260);
    let current = targets[0].id;

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      current = targets[targets.length - 1].id;
    } else {
      for (const section of targets) {
        if (marker >= section.offsetTop) current = section.id;
      }
    }

    navButtons.forEach((button) => {
      const active = button.getAttribute("href") === `#${current}`;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "location");
      else button.removeAttribute("aria-current");
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

  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    document
      .querySelectorAll(".section, .hero, .portfolio-item, .achievement-card, .credential-card")
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
        const visible = filter === "all" || project.dataset.category === filter;
        project.classList.toggle("project-hidden", !visible);
      });
    });
  });

  const slideshows = Array.from(document.querySelectorAll("[data-slideshow]"));

  if (!reducedMotion && slideshows.length) {
    const controllers = slideshows.map((slideshow, slideshowIndex) => {
      const slides = Array.from(slideshow.querySelectorAll(":scope > img"));
      const dots = Array.from(slideshow.querySelectorAll(".slideshow-dots i"));
      const interactionTarget = slideshow.closest("a") || slideshow;
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
