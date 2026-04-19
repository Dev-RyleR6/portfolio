/**
 * Light haptic success pulse (Android / supported devices). Skipped when the user
 * prefers reduced motion. No sound — see comment in index if you add opt-in audio later.
 */
(function () {
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.uiSuccessFeedback = function uiSuccessFeedback() {
    if (prefersReducedMotion()) return;
    try {
      if (typeof navigator.vibrate === "function") {
        navigator.vibrate(12);
      }
    } catch {
      /* ignore */
    }
  };
})();
