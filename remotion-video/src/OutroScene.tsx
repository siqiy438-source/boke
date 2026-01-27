import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansSC";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const COLORS = {
  brandOrange: "#F97316",
  amber: "#F59E0B",
  slate900: "#0F172A",
  slate700: "#334155",
  slate400: "#94A3B8",
  white: "#FFFFFF",
  gradientStart: "#FFF7ED",
  gradientEnd: "#EFF6FF",
};

// 场景4: 结尾 CTA
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const textOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.slate900} 0%, #1E293B 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          background: `linear-gradient(135deg, ${COLORS.brandOrange} 0%, ${COLORS.amber} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          boxShadow: "0 20px 60px rgba(249,115,22,0.3)",
          marginBottom: 50,
        }}
      >
        <span
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: COLORS.white,
          }}
        >
          思
        </span>
      </div>

      {/* 标题 */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: COLORS.white,
          margin: 0,
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        思奇的创业笔记
      </h1>

      {/* 副标题 */}
      <p
        style={{
          fontSize: 32,
          color: COLORS.slate400,
          marginTop: 20,
          opacity: textOpacity,
        }}
      >
        与你一起成长
      </p>

      {/* CTA 按钮 */}
      <div
        style={{
          marginTop: 60,
          opacity: ctaOpacity,
          transform: `scale(${Math.max(0, ctaScale)})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.brandOrange} 0%, ${COLORS.amber} 100%)`,
            padding: "24px 60px",
            borderRadius: 50,
            boxShadow: "0 10px 40px rgba(249,115,22,0.4)",
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.white,
            }}
          >
            立即访问 →
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default OutroScene;
