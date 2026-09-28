import { NextRequest, NextResponse } from "next/server";
import { refreshPresence } from "@/lib/server/visitor-presence";
import {
  getClientIp,
  getCountryCode,
  maskIpAddress,
  parseUserAgent,
} from "@/lib/server/visitor-request";
import { getVisitCount } from "@/lib/server/vercel-visits";

const VISITOR_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const responseHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "Cross-site request rejected." }, { status: 403, headers: responseHeaders });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 1_024) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413, headers: responseHeaders });
  }

  let body: { visitorId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400, headers: responseHeaders });
  }

  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
  if (!VISITOR_ID_PATTERN.test(visitorId)) {
    return NextResponse.json({ error: "Invalid visitor session." }, { status: 400, headers: responseHeaders });
  }

  const { browser, os } = parseUserAgent(request.headers.get("user-agent"));
  const [online, visits] = await Promise.all([
    refreshPresence(visitorId),
    getVisitCount(),
  ]);

  return NextResponse.json(
    {
      visits,
      online,
      country: getCountryCode(request.headers),
      browser,
      os,
      ip: maskIpAddress(getClientIp(request.headers)),
    },
    { headers: responseHeaders },
  );
}
