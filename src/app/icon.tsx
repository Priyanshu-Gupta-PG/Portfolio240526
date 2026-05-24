import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          background: "#0a0908",
          color: "#f5a623",
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          borderRadius: 12,
        }}
      >
        pg
      </div>
    ),
    { ...size }
  );
}
