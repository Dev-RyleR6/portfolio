
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");

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
      showSnackbar("Please fill in all fields.");
    } else if (!isValidEmail(email)) {
      showSnackbar("Please enter a valid email address.");
    } else {
      showSnackbar("Thanks for reaching out! Your message has been received.");
      form.reset();
    }
  });

  // Snackbar function
  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) return;
    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  };
});