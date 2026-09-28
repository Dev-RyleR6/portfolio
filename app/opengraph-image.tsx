import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Ryle Anthony Gabotero | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#0d0f12",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: "#000000",
            }}
          >
            R
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#9ca3af" }}>
            devR6
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#10b981",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Software Engineer · Cybersecurity &amp; Applied AI
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#9ca3af",
              margin: 0,
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            National Cybersecurity Competitor (WorldSkills Philippines) · Backend Architecture, Computer Vision &amp; Distributed Systems
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: "24px",
            color: "#6b7280",
            fontSize: "20px",
          }}
        >
          <span>Negros Island Region, Philippines</span>
          <span>github.com/Dev-RyleR6</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
