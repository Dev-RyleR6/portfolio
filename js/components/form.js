
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const message = document.querySelector("#contact-message").value;

    if (!name || !email || !message) {
      showSnackbar("Please fill in all fields.", "error");
    } else if (!isValidEmail(email)) {
      showSnackbar("Please enter a valid email address.", "error");
    } else {
      showSnackbar("Thanks for reaching out! Your message has been received.", "success");
      form.reset();
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