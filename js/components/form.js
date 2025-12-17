
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const message = document.querySelector("#contact-message").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
    } else {
      alert("Thanks for reaching out! Your message has been received.");
      form.reset();
    }
  });
});