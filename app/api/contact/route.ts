import { NextRequest, NextResponse } from "next/server";

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

  // Honeypot check
  if (botcheck) {
    return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 200 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "Please fill in all fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // In local dev, gracefully succeed so testing works
    if (process.env.NODE_ENV !== "production") {
      console.log("[Dev Contact] Message simulated:", { name, email, message });
      return NextResponse.json({ success: true, message: "Message sent (dev simulated)." });
    }
    return NextResponse.json(
      { success: false, message: "Contact form is currently unconfigured. Please email ryleanthony.gabotero@gmail.com directly." },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio message from ${name}`,
        name,
        email,
        message,
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({ success: false, message: "Unexpected response from mail service." }));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ success: false, message: "Mail service is temporarily unavailable. Please email ryleanthony.gabotero@gmail.com." }, { status: 502 });
  }
}

