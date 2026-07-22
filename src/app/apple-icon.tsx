import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = {
  height: 180,
  width: 180,
};

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={ {
          alignItems: "center",
          background: "linear-gradient(135deg, #0C66E4 0%, #0A3499 100%)",
          borderRadius: 40,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        } }
      >
        <div
          style={ {
            border: "10px solid white",
            borderRadius: "9999px",
            height: 92,
            position: "absolute",
            width: 92,
          } }
        />
        <div
          style={ {
            alignItems: "center",
            display: "flex",
            gap: 4,
            position: "absolute",
          } }
        >
          <div style={ { background: "white", borderRadius: 3, height: 20, width: 6 } } />
          <div style={ { background: "white", borderRadius: 4, height: 34, width: 10 } } />
          <div style={ { background: "white", borderRadius: 3, height: 40, width: 6 } } />
        </div>
        <div
          style={ {
            background: "white",
            borderRadius: 6,
            height: 12,
            width: 128,
          } }
        />
        <div
          style={ {
            alignItems: "center",
            display: "flex",
            gap: 4,
            position: "absolute",
            right: 28,
          } }
        >
          <div style={ { background: "white", borderRadius: 3, height: 40, width: 6 } } />
          <div style={ { background: "white", borderRadius: 4, height: 34, width: 10 } } />
          <div style={ { background: "white", borderRadius: 3, height: 20, width: 6 } } />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
