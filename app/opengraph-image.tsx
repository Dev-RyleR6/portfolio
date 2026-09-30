import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = "Ryle Anthony Gabotero | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let avatarDataUrl = "";
  try {
    const iconBuffer = await fs.readFile(
      path.join(process.cwd(), "public/assets/icons/pwa-192.png")
    );
    avatarDataUrl = `data:image/png;base64,${iconBuffer.toString("base64")}`;
  } catch {
    // Graceful fallback if file is unavailable during static generation
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090a0d",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Centered card designed for both 16:9 banner and 1:1 Google snippet crop */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "580px",
            padding: "24px",
          }}
        >
          {/* Avatar with emerald accent border */}
          {avatarDataUrl ? (
            <div
              style={{
                display: "flex",
                width: "112px",
                height: "112px",
                borderRadius: "56px",
                border: "3px solid #10b981",
                overflow: "hidden",
                marginBottom: "20px",
                backgroundColor: "#000000",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarDataUrl}
                alt=""
                width={112}
                height={112}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: "#10b981",
                fontSize: "36px",
                fontWeight: 800,
                color: "#000000",
                marginBottom: "20px",
              }}
            >
              R
            </div>
          )}

          {/* Eyebrow badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              devR6 · Portfolio
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "44px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: "12px",
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            {siteConfig.name}
          </h1>

          {/* Role */}
          <p
            style={{
              fontSize: "20px",
              color: "#e4e4e7",
              fontWeight: 600,
              margin: 0,
              marginBottom: "14px",
              lineHeight: 1.3,
            }}
          >
            Software Engineer · Cybersecurity &amp; Applied AI
          </p>

          {/* Competitor / Location tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#a1a1aa",
              fontSize: "15px",
              lineHeight: 1.4,
            }}
          >
            <span>WorldSkills Competitor</span>
            <span>·</span>
            <span>Negros Island Region, Philippines</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
