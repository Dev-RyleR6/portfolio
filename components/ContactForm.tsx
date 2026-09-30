"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      botcheck: String(formData.get("botcheck") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : `Could not send message. Please email me directly at ${siteConfig.email}.`
      );
    }
  }

  if (status === "success") {
    return (
      <div className="contact-status contact-status--success" role="status">
        <svg className="contact-success__icon" aria-hidden="true" viewBox="0 0 20 20" fill="none">
          <path d="m4.75 10.25 3.25 3.25 7.25-7.25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="contact-success__copy">
          <h3>Message sent</h3>
          <p>Thanks for reaching out. I’ll reply within 24 to 48 hours.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="contact-btn-secondary"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Honeypot field */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "error" && (
        <div className="contact-status contact-status--error" role="alert">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          autoComplete="name"
          disabled={status === "sending"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          disabled={status === "sending"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="Tell me about the role, project, or technical challenge."
          disabled={status === "sending"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="contact-submit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
