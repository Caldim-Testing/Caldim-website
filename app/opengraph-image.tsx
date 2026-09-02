import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CALDIM Software Division — Enterprise Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #002B54 0%, #2563eb 100%)",
          color: "white",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        <div>CALDIM</div>
        <div style={{ fontSize: 28, fontWeight: 500, marginTop: 16, opacity: 0.85 }}>
          Enterprise Digital Solutions
        </div>
      </div>
    ),
    { ...size }
  );
}
