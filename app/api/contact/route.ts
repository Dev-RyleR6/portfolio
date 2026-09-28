import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  buildInquiryFrom,
  buildInquiryHtml,
  buildInquirySubject,
  buildInquiryText,
} from "@/lib/email-template";

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
    const fromAddress = process.env.RESEND_FROM_EMAIL || "contact@ryleanthony-gabotero.tech";
    const from = buildInquiryFrom(name, fromAddress);
    const subject = buildInquirySubject(name, message);
    const html = buildInquiryHtml({ name, email, message });
    const text = buildInquiryText({ name, email, message });

    const { data, error } = await resend.emails.send({
      from,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
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
