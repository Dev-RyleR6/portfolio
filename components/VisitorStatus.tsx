"use client";

import { Fragment, useEffect, useState } from "react";

const HEARTBEAT_INTERVAL_MS = 25_000;
const SESSION_STORAGE_KEY = "portfolio-visitor-session";
const visitFormatter = new Intl.NumberFormat("en-US");

type VisitorInfo = {
  visits?: number;
  online?: number;
  country: string;
  browser: string;
  os: string;
  ip?: string;
};

function createVisitorId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const value = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}

function getVisitorId(): string {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) return stored;

    const visitorId = createVisitorId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, visitorId);
    return visitorId;
  } catch {
    return createVisitorId();
  }
}

function isVisitorInfo(value: unknown): value is VisitorInfo {
  if (!value || typeof value !== "object") return false;
  const info = value as Partial<VisitorInfo>;
  return typeof info.country === "string"
    && typeof info.browser === "string"
    && typeof info.os === "string";
}

export function VisitorStatus() {
  const [info, setInfo] = useState<VisitorInfo | null>(null);

  useEffect(() => {
    const visitorId = getVisitorId();
    let active = true;
    let requestInProgress = false;
    let controller: AbortController | undefined;

    async function refresh() {
      if (document.visibilityState === "hidden" || requestInProgress) return;

      requestInProgress = true;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 8_000);

      try {
        const response = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) return;
        const payload: unknown = await response.json();
        if (active && isVisitorInfo(payload)) setInfo(payload);
      } catch {
        // The status line is optional and fails silently when a backing service is unavailable.
      } finally {
        window.clearTimeout(timeout);
        requestInProgress = false;
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") void refresh();
    }

    void refresh();
    const heartbeat = window.setInterval(() => void refresh(), HEARTBEAT_INTERVAL_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const items: string[] = [];
  if (typeof info?.visits === "number") {
    items.push(`${visitFormatter.format(info.visits)} ${info.visits === 1 ? "visit" : "visits"}`);
  }
  if (typeof info?.online === "number") items.push(`${info.online} active now`);
  if (info?.country) items.push(info.country);
  if (info) {
    items.push(info.browser === "Unknown" && info.os === "Unknown"
      ? "Unknown"
      : `${info.browser} / ${info.os}`);
  }
  if (info?.ip) items.push(info.ip);

  return (
    <div
      className={`visitor-footprint${items.length ? " visitor-footprint--ready" : ""}`}
      aria-hidden={items.length ? undefined : true}
    >
      <p className="visitor-footprint__title">Your footprint</p>
      <p
        className="visitor-status"
        aria-label={items.length ? `Visitor information: ${items.join(", ")}` : undefined}
      >
        {items.map((item, index) => (
          <Fragment key={item}>
            <span className="visitor-status__item">{item}</span>
            {index < items.length - 1 ? <span className="visitor-status__separator" aria-hidden="true">·</span> : null}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
