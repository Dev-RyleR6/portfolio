import "server-only";

import { isIP } from "node:net";

export type ClientDetails = {
  browser: string;
  os: string;
};

const LOCAL_ADDRESSES = new Set(["127.0.0.1", "::1", "0:0:0:0:0:0:0:1"]);

function normalizeIpCandidate(value: string): string | undefined {
  let candidate = value.split(",", 1)[0]?.trim();
  if (!candidate) return undefined;

  if (candidate.startsWith("[")) {
    const closingBracket = candidate.indexOf("]");
    if (closingBracket > 0) candidate = candidate.slice(1, closingBracket);
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"));
  }

  const zoneIndex = candidate.indexOf("%");
  if (zoneIndex !== -1) candidate = candidate.slice(0, zoneIndex);

  return isIP(candidate) ? candidate : undefined;
}

export function getClientIp(headers: Headers): string | undefined {
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("x-forwarded-for"),
  ];

  for (const value of candidates) {
    if (!value) continue;
    const ip = normalizeIpCandidate(value);
    if (ip && !LOCAL_ADDRESSES.has(ip.toLowerCase())) return ip;
  }

  return undefined;
}

export function maskIpAddress(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const ip = normalizeIpCandidate(value);
  if (!ip) return undefined;

  if (isIP(ip) === 4) {
    return `${ip.slice(0, ip.lastIndexOf("."))}.xxx`;
  }

  const mappedIpv4 = ip.match(/^(.*:)(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mappedIpv4) {
    const maskedIpv4 = maskIpAddress(mappedIpv4[2]);
    return maskedIpv4 ? `${mappedIpv4[1]}${maskedIpv4}` : undefined;
  }

  const [left = "", right = ""] = ip.split("::", 2);
  const leftGroups = left ? left.split(":") : [];
  const rightGroups = right ? right.split(":") : [];
  const zeroGroups = ip.includes("::")
    ? Array(Math.max(0, 8 - leftGroups.length - rightGroups.length)).fill("0")
    : [];
  const expanded = [...leftGroups, ...zeroGroups, ...rightGroups];
  const visiblePrefix = expanded.slice(0, 3).map((group) => group.replace(/^0+(?=.)/, "") || "0");

  return `${visiblePrefix.join(":")}:xxxx`;
}

export function getCountryCode(headers: Headers): string {
  const country = headers.get("x-vercel-ip-country")?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : "--";
}

export function parseUserAgent(userAgent: string | null): ClientDetails {
  if (!userAgent) return { browser: "Unknown", os: "Unknown" };

  let browser = "Unknown";
  if (/SamsungBrowser\//i.test(userAgent)) browser = "Samsung Internet";
  else if (/(?:Edg|EdgiOS|EdgA)\//i.test(userAgent)) browser = "Edge";
  else if (/(?:OPR|Opera)\//i.test(userAgent)) browser = "Opera";
  else if (/(?:CriOS|Chrome)\//i.test(userAgent)) browser = "Chrome";
  else if (/(?:FxiOS|Firefox)\//i.test(userAgent)) browser = "Firefox";
  else if (/Safari\//i.test(userAgent) && /Version\//i.test(userAgent)) browser = "Safari";

  let os = "Unknown";
  if (/Windows NT/i.test(userAgent)) os = "Windows";
  else if (/Android/i.test(userAgent)) os = "Android";
  else if (/(?:iPhone|iPad|iPod)/i.test(userAgent)) os = "iOS";
  else if (/CrOS/i.test(userAgent)) os = "Chrome OS";
  else if (/Mac OS X|Macintosh/i.test(userAgent)) os = "macOS";
  else if (/Linux/i.test(userAgent)) os = "Linux";

  return { browser, os };
}
