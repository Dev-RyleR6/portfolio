import { NextRequest, NextResponse } from "next/server";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ success: false, message: "Cross-site submission rejected." }, { status: 403 });
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) return NextResponse.json({ success: false, message: "Payload too large." }, { status: 413 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { return NextResponse.json({ success: false, message: "Invalid JSON payload." }, { status: 400 }); }

  const name = String(body.name || "").replace(/[\r\n]/g, " ").trim().slice(0, 80);
  const email = String(body.email || "").trim().slice(0, 254);
  const message = String(body.message || "").trim().slice(0, 4000);
  const botcheck = String(body.botcheck || "");
  const captcha = String(body["h-captcha-response"] || "");

  if (botcheck) return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 200 });
  if (!name || !email || !message || !captcha) return NextResponse.json({ success: false, message: "Complete all fields and verification." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return NextResponse.json({ success: false, message: "Contact service is not configured. Please use direct email." }, { status: 503 });

  try {
    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, subject: `Portfolio Contact: ${name}`, name, email, message, botcheck: "", "h-captcha-response": captcha }),
      cache: "no-store",
    });
    const data = await upstream.json().catch(() => ({ success: false, message: "Unexpected delivery response." }));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ success: false, message: "Delivery service unavailable. Please try again later." }, { status: 502 });
  }
}
