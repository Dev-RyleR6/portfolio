"use client";

import { FormEvent, useRef, useState } from "react";

declare global {
  interface Window { hcaptcha?: { reset: () => void } }
}

type Notice = { message: string; variant: "info" | "success" | "error" } | null;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmission = useRef(0);
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  function announce(message: string, variant: NonNullable<Notice>["variant"]) {
    setNotice({ message, variant });
    window.setTimeout(() => setNotice(null), 3600);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = Date.now();
    if (now - lastSubmission.current < 10_000) {
      announce("Please wait a moment before sending another message.", "info");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      botcheck: String(data.get("botcheck") || ""),
      "h-captcha-response": String(data.get("h-captcha-response") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      announce("Please fill in all fields.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      announce("Please enter a valid email address.", "error");
      return;
    }
    if (!captchaVisible) {
      setCaptchaVisible(true);
      announce("Complete the verification, then select Send again.", "info");
      return;
    }
    if (!payload["h-captcha-response"]) {
      announce("Please complete the verification.", "error");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(typeof result.message === "string" ? result.message : "Could not send your message.");
      lastSubmission.current = Date.now();
      form.reset();
      window.hcaptcha?.reset();
      setCaptchaVisible(false);
      announce("Message sent. I’ll get back to you soon.", "success");
    } catch (error) {
      window.hcaptcha?.reset();
      announce(error instanceof Error ? error.message : "Network error. Please try email instead.", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form className="contact-form" ref={formRef} onSubmit={submit} noValidate autoComplete="on">
        <div className="form-group contact-form__hp" aria-hidden="true"><label htmlFor="contact-company">Company</label><input type="text" id="contact-company" name="botcheck" tabIndex={-1} autoComplete="off" /></div>
        <div className="form-group"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" maxLength={120} placeholder="Your name" /></div>
        <div className="form-group"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="you@example.com" /></div>
        <div className="form-group"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={6} maxLength={4000} placeholder="A little context about your project or opportunity…" /></div>
        <div className={`form-group contact-form__captcha-wrap ${captchaVisible ? "contact-form__captcha-wrap--visible" : "contact-form__captcha-wrap--hidden"}`} aria-hidden={!captchaVisible}>
          <span className="contact-form__captcha-label">Verification</span><div className="h-captcha" data-captcha="true" data-size="compact" data-theme="light" />
        </div>
        <button type="submit" className={`contact-submit${sending ? " is-loading" : ""}`} disabled={sending} aria-busy={sending}><span className="contact-submit__label">{sending ? "Sending…" : "Send message"}</span><span className="contact-submit__spinner" aria-hidden="true" /></button>
      </form>
      {notice && <div className="snackbar is-visible" data-variant={notice.variant} role="status" aria-live="polite"><div className="snackbar__inner"><span className="snackbar__glyph" aria-hidden="true">●</span><p className="snackbar__message">{notice.message}</p></div></div>}
    </>
  );
}
