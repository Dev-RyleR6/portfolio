import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ success: false, message: "Cross-site submission rejected." }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) {
    return NextResponse.json({ success: false, message: "Payload too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  const name = String(body.name || "").replace(/[\r\n]/g, " ").trim().slice(0, 80);
  const email = String(body.email || "").trim().slice(0, 254);
  const message = String(body.message || "").trim().slice(0, 4000);
  const botcheck = String(body.botcheck || "");

  // Honeypot spam check
  if (botcheck) {
    return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 200 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "Please fill in all fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // In local development without an API key, simulate sending so testing works seamlessly
    if (process.env.NODE_ENV !== "production") {
      console.log("[Dev Resend] Message simulated:", { name, email, message });
      return NextResponse.json({ success: true, message: "Message sent (dev simulated)." });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Email service is currently unconfigured. Please email ryleanthony.gabotero@gmail.com directly.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_EMAIL || siteConfig.email;
    // Resend free tier sends from onboarding@resend.dev; custom domains can be set via RESEND_FROM_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="margin-top: 0; font-size: 1.25rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; color: #111;">New Portfolio Inquiry</h2>
          <p style="margin: 8px 0;"><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #f9fafb; border-radius: 6px; white-space: pre-wrap; font-size: 0.95rem; border: 1px solid #e5e7eb;">
${message}
          </div>
          <p style="margin-top: 20px; font-size: 0.85rem; color: #6b7280;">Hit "Reply" in your email client to respond directly to ${email}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to deliver email through Resend." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!", id: data?.id });
  } catch (err) {
    console.error("[Resend Exception]:", err);
    return NextResponse.json(
      { success: false, message: "Email service temporarily unavailable. Please try direct email." },
      { status: 502 }
    );
  }
}
