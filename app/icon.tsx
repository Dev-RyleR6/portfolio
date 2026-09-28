import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0f12",
          borderRadius: "10px",
          color: "#10b981",
          fontSize: "26px",
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}
