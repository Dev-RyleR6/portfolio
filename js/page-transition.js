/**
 * Outbound: index.html — intercept navigation to projects.html and show overlay.
 * Incoming: projects.html — fade overlay after paint (min display for smooth handoff).
 */
(function () {
  const overlay = document.getElementById("page-transition");
  if (!overlay) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const path = window.location.pathname || "";
  const isArchive =
    /projects\.html$/i.test(path) || /[/\\]projects\.html$/i.test(path);

  function removeOverlay() {
    overlay.remove();
    document.body.classList.remove("page-transition-lock");
  }

  if (isArchive) {
    document.body.classList.add("page-transition-lock");

    const minShow = reduced ? 0 : 280;
    const t0 = performance.now();

    function hideIncoming() {
      overlay.classList.add("is-done");
      const fallback = setTimeout(removeOverlay, reduced ? 120 : 500);
      overlay.addEventListener(
        "transitionend",
        (ev) => {
          if (ev.target !== overlay || ev.propertyName !== "opacity") return;
          clearTimeout(fallback);
          removeOverlay();
        },
        { once: true }
      );
    }

    function scheduleHide() {
      const elapsed = performance.now() - t0;
      const wait = Math.max(0, minShow - elapsed);
      setTimeout(hideIncoming, wait);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        requestAnimationFrame(scheduleHide)
      );
    } else {
      requestAnimationFrame(scheduleHide);
    }
    return;
  }

  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    overlay.classList.remove("is-visible");
    document.body.classList.remove("page-transition-lock");
  });

  const links = document.querySelectorAll(
    'a[href$="projects.html"]:not([target="_blank"])'
  );

  links.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const url = anchor.getAttribute("href");
      if (!url || url.startsWith("#")) return;

      e.preventDefault();
      overlay.classList.add("is-visible");
      document.body.classList.add("page-transition-lock");

      const delay = reduced ? 100 : 520;
      setTimeout(() => {
        window.location.href = anchor.href;
      }, delay);
    });
  });
})();
