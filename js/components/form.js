/**
 * Contact form: Web3Forms email delivery when WEB3FORMS_ACCESS_KEY is set
 * (https://web3forms.com — free, add your domain in their dashboard).
 * hCaptcha: enable “hCaptcha” under spam protection in the Web3Forms dashboard.
 * If the key is empty, submits open the visitor's mail client (mailto fallback).
 */
const WEB3FORMS_ACCESS_KEY = "acdc23cb-071d-4695-93c3-088e0f114aea";
const CONTACT_EMAIL = "ryleanthony.gabotero@gmail.com";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

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

  function openMailto({ name, email, message }) {
    const subject = encodeURIComponent(name);
    let body = `${message}\n\n—\n${name}\n${email}`;
    if (body.length > 1800) {
      body =
        body.slice(0, 1700) +
        "\n\n[Message truncated — please use a shorter note or configure Web3Forms.]";
    }
    const url = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.assign(url);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const honeypot = document.querySelector("#contact-company")?.value?.trim();
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

    const web3Key = WEB3FORMS_ACCESS_KEY.trim();
    if (web3Key) {
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
        const res = await fetch(WEB3FORMS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: name,
            name,
            email,
            message,
            "h-captcha-response": captchaToken,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (data.success) {
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
      return;
    }

    showSnackbar("Opening your email app with this message…", "info");
    openMailto({ name, email, message });
    form.reset();
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
