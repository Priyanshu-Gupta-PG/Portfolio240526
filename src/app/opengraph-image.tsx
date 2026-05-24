import { ImageResponse } from "next/og";

export const alt = "Priyanshu Gupta — Founder · Operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0908",
          padding: "72px",
          fontFamily: "Georgia, serif",
          color: "#f5f0e8",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            left: 600,
            width: 1000,
            height: 1000,
            borderRadius: "100%",
            background: "radial-gradient(circle, #f5a62333 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 16,
            fontFamily: "ui-monospace, monospace",
            color: "#a6a09a",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 32, height: 1, background: "#f5a623" }} />
          <span>Founder · Operator</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 128,
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#f5f0e8",
            }}
          >
            Two acquisitions
          </div>
          <div
            style={{
              fontSize: 128,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "#a6a09a",
            }}
          >
            before college.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 56,
            fontSize: 18,
            fontFamily: "ui-monospace, monospace",
            color: "#a6a09a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Priyanshu Gupta · priyanshugupta.in</span>
          <span style={{ color: "#f5a623" }}>● open to build</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
