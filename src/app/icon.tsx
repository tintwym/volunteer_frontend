import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** CommonGround tab icon — emerald tile + handshake mark */
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
          borderRadius: 8,
          background: "#059669",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        CG
      </div>
    ),
    { ...size },
  );
}
