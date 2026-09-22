/**
 * Contact form: Submits to /api/contact (Vercel Serverless Function proxying to Web3Forms).
 * Keeps API keys hidden securely on the server.
 * Fallback: opens the visitor's mail client (mailto).
 */
const CONTACT_API_URL = "/api/contact";

// Base64-encoded fallback email to protect against web scrapers
const OBFUSCATED_EMAIL = "cnlsZWFudGhvbnkuZ2Fib3Rlcm9AZ21haWwuY29t";
function getContactEmail() {
  try {
    return atob(OBFUSCATED_EMAIL);
  } catch {
    return "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#contactSubmit");
  const captchaWrap = document.getElementById("contactCaptchaWrap");
  if (!form || !submitBtn) return;

  const labelEl = submitBtn.querySelector(".contact-submit__label");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setSending(isSending) {
    submitBtn.disabled = isSending;
    submitBtn.classList.toggle("is-loading", isSending);
    submitBtn.setAttribute("aria-busy", isSending ? "true" : "false");
    if (labelEl) {
      labelEl.textContent = isSending ? "Sending…" : "Send Message";
    }
  }

  function getHCaptchaToken() {
    const ta = form.querySelector('textarea[name="h-captcha-response"]');
    return ta?.value?.trim() ?? "";
  }

  function resetHCaptcha() {
    try {
      if (typeof window.hcaptcha !== "undefined" && typeof window.hcaptcha.reset === "function") {
        window.hcaptcha.reset();
      }
    } catch {
      /* ignore */
    }
  }

  function hideCaptchaPanel() {
    if (!captchaWrap) return;
    captchaWrap.classList.add("contact-form__captcha-wrap--hidden");
    captchaWrap.classList.remove("contact-form__captcha-wrap--visible");
    captchaWrap.setAttribute("aria-hidden", "true");
  }

  function revealCaptchaPanel() {
    if (!captchaWrap) return;
    captchaWrap.classList.remove("contact-form__captcha-wrap--hidden");
    captchaWrap.classList.add("contact-form__captcha-wrap--visible");
    captchaWrap.removeAttribute("aria-hidden");
    requestAnimationFrame(() => {
      captchaWrap.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });
  }

  function isCaptchaPanelVisible() {
    return Boolean(
      captchaWrap?.classList.contains("contact-form__captcha-wrap--visible")
    );
  }

  let lastSubmitTime = 0;
  const SUBMIT_COOLDOWN_MS = 10000;

  function openMailto({ name, email, message }) {
    const cleanName = name.replace(/[\r\n]/g, " ").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${cleanName.slice(0, 60)}`);
    let body = `${message}\n\n—\n${cleanName}\n${email}`;
    if (body.length > 1800) {
      body =
        body.slice(0, 1700) +
        "\n\n[Message truncated — please use a shorter note.]";
    }
    const emailTo = getContactEmail();
    const url = `mailto:${emailTo}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.assign(url);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
      showSnackbar(`Please wait ${waitSeconds}s before sending another message.`, "info");
      return;
    }

    const honeypot = document.querySelector("#contact-company")?.value?.trim() ?? "";
    if (honeypot) {
      showSnackbar("Unable to send this message.", "error");
      return;
    }

    const name = document.querySelector("#contact-name")?.value.trim() ?? "";
    const email = document.querySelector("#contact-email")?.value.trim() ?? "";
    const message = document.querySelector("#contact-message")?.value.trim() ?? "";

    if (!name || !email || !message) {
      showSnackbar("Please fill in all fields.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showSnackbar("Please enter a valid email address.", "error");
      return;
    }

    const cleanName = name.replace(/[\r\n]/g, " ").trim();

    if (!isCaptchaPanelVisible()) {
      revealCaptchaPanel();
      showSnackbar(
        "Complete the verification, then tap Send again.",
        "info"
      );
      return;
    }

    const captchaToken = getHCaptchaToken();
    if (!captchaToken) {
      showSnackbar("Please complete the verification.", "error");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email,
          message,
          botcheck: honeypot,
          "h-captcha-response": captchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        lastSubmitTime = Date.now();
        if (typeof window.uiSuccessFeedback === "function") {
          window.uiSuccessFeedback();
        }
        showSnackbar("Message sent. I’ll get back to you soon.", "success");
        form.reset();
        resetHCaptcha();
        hideCaptchaPanel();
      } else {
        resetHCaptcha();
        showSnackbar(
          typeof data.message === "string"
            ? data.message
            : "Could not send. Try again or email directly.",
          "error"
        );
      }
    } catch {
      resetHCaptcha();
      showSnackbar("Network error. Check your connection or try email.", "error");
    } finally {
      setSending(false);
    }
  });

  let snackbarHideTimer;
  let snackbarTransitionCleanup;

  function showSnackbar(message, variant = "info") {
    const snackbar = document.getElementById("snackbar");
    const textEl = snackbar?.querySelector(".snackbar__message");
    if (!snackbar || !textEl) return;

    clearTimeout(snackbarHideTimer);
    if (snackbarTransitionCleanup) {
      snackbar.removeEventListener("transitionend", snackbarTransitionCleanup);
      snackbarTransitionCleanup = null;
    }

    snackbar.dataset.variant = variant;
    textEl.textContent = message;
    snackbar.removeAttribute("hidden");
    snackbar.classList.remove("is-visible");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => snackbar.classList.add("is-visible"));
    });

    snackbarHideTimer = setTimeout(() => {
      snackbar.classList.remove("is-visible");
      const done = () => {
        snackbar.setAttribute("hidden", "");
        snackbar.removeEventListener("transitionend", snackbarTransitionCleanup);
        snackbarTransitionCleanup = null;
      };
      snackbarTransitionCleanup = (ev) => {
        if (ev.target !== snackbar || ev.propertyName !== "opacity") return;
        done();
      };
      snackbar.addEventListener("transitionend", snackbarTransitionCleanup);
      setTimeout(done, 450);
    }, 3200);
  }
});
