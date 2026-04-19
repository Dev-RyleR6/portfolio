/**
 * projects.html only: incoming loader on first paint, outbound “Returning home” to index.
 */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Archive page: incoming overlay exists AND body marker (avoids false positives).
   */
  const isArchive = Boolean(
    document.getElementById("page-transition-incoming") &&
      document.body.classList.contains("page-archive")
  );

  function sameDocument(anchor) {
    try {
      const dest = new URL(anchor.href, window.location.href);
      const here = new URL(window.location.href);
      return (
        dest.origin === here.origin &&
        dest.pathname === here.pathname &&
        dest.search === here.search
      );
    } catch {
      return false;
    }
  }

  function installOutgoing(overlay, selector) {
    if (!overlay) return;

    window.addEventListener("pageshow", (e) => {
      if (!e.persisted) return;
      overlay.classList.remove("is-visible");
      document.body.classList.remove("page-transition-lock");
    });

    document.querySelectorAll(selector).forEach((anchor) => {
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
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        if (sameDocument(anchor)) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        overlay.classList.add("is-visible");
        document.body.classList.add("page-transition-lock");

        const delay = reduced ? 100 : 520;
        setTimeout(() => {
          window.location.href = anchor.href;
        }, delay);
      });
    });
  }

  function runIncomingSequence(overlay) {
    if (!overlay || overlay.dataset.ptActive === "1") return;
    overlay.dataset.ptActive = "1";

    document.body.classList.add("page-transition-lock");

    const minShow = reduced ? 0 : 280;
    const t0 = performance.now();
    let finished = false;

    const hardStop = setTimeout(finish, 3500);

    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(hardStop);
      overlay.remove();
      document.body.classList.remove("page-transition-lock");
    }

    function hideIncoming() {
      overlay.classList.add("is-done");
      const fallback = setTimeout(finish, reduced ? 120 : 500);
      overlay.addEventListener(
        "transitionend",
        (ev) => {
          if (ev.target !== overlay || ev.propertyName !== "opacity") return;
          clearTimeout(fallback);
          finish();
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
  }

  if (isArchive) {
    runIncomingSequence(
      document.getElementById("page-transition-incoming")
    );
    installOutgoing(
      document.getElementById("page-transition-out-home"),
      'a[href$="index.html"]:not([target="_blank"])'
    );
    return;
  }
})();
