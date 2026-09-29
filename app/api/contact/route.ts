import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  buildInquiryFrom,
  buildInquiryHtml,
  buildInquirySubject,
  buildInquiryText,
} from "@/lib/email-template";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { getClientIp } from "@/lib/server/visitor-request";

function isAllowedOrigin(origin: string, request: NextRequest): boolean {
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const host = (
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      ""
    ).toLowerCase();

    if (host && originHost === host) return true;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl && originHost === new URL(siteUrl).host.toLowerCase()) return true;

    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    if (vercelUrl && originHost === vercelUrl.toLowerCase()) return true;

    if (
      process.env.NODE_ENV !== "production" &&
      (originHost.startsWith("localhost:") ||
        originHost === "localhost" ||
        originHost.startsWith("127.0.0.1:") ||
        originHost === "127.0.0.1")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // 1. Cross-site request validation
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ success: false, message: "Cross-site submission rejected." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (origin && !isAllowedOrigin(origin, request)) {
    return NextResponse.json({ success: false, message: "Cross-origin submission rejected." }, { status: 403 });
  }

  const referer = request.headers.get("referer");
  if (!origin && referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!isAllowedOrigin(refererOrigin, request)) {
        return NextResponse.json({ success: false, message: "Cross-origin submission rejected." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ success: false, message: "Invalid referer header." }, { status: 403 });
    }
  }

  // 2. Payload size check
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) {
    return NextResponse.json({ success: false, message: "Payload too large." }, { status: 413 });
  }

  // 3. Rate limiting (5 inquiries per 10 minutes per IP)
  const clientIp = getClientIp(request.headers) || "unknown-client";
  const rateLimit = await checkRateLimit("contact", clientIp, {
    limit: 5,
    windowSeconds: 600,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many contact requests. Please wait a few minutes before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetSeconds),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  }

  // 4. JSON body parsing
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
      return NextResponse.json(
        { success: true, message: "Message sent (dev simulated)." },
        {
          headers: {
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
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

    const cleanNameForHeader = name.replace(/[\r\n"<>]/g, " ").trim();
    const replyTo = cleanNameForHeader ? `"${cleanNameForHeader}" <${email}>` : `<${email}>`;

    const { data, error } = await resend.emails.send({
      from,
      to: toEmail,
      replyTo,
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

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", id: data?.id },
      {
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (err) {
    console.error("[Resend Exception]:", err);
    return NextResponse.json(
      { success: false, message: "Email service temporarily unavailable. Please try direct email." },
      { status: 502 }
    );
  }
}
